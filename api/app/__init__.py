# app/__init__.py
import json
from datetime import datetime
import jsonschema
import random
from flask_api import FlaskAPI, status
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, Text, Integer
from flask import request, jsonify, abort, make_response
from shapely.geometry import shape, Point
from sqlalchemy import text
import json
import pprint
from io import StringIO
import dropbox
import parser

from shapely.geometry import shape, Point

# local import

from instance.config import app_config

# For password hashing
from flask_bcrypt import Bcrypt

class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)


# initialize db
db = SQLAlchemy()

from app.card_models import Card
from app.user_models import User, Session
from app.importer_models import Country
from app.targetgroup_models import TargetGroup
from app.content_models import Content
from app.beetroute_models import Trip, Waypoint

loggedinuser = 0

def create_app(config_name):

    app = FlaskAPI(__name__, instance_relative_config=True)
    # overriding Werkzeugs built-in password hashing utilities using Bcrypt.
    bcrypt = Bcrypt(app)

    app.config.from_object(app_config[config_name])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/api/real/login/account', methods=['POST'])
    def login():

        password = request.data.get('password', '')
        userName    = request.data.get('userName', '')

        user = User.get_all().filter(User.userName == userName).first()
        print (user)
        if user is not None:
          response = jsonify({'status' : 'ok', 'type' : 'account', 'userId' : user.id, 'currentAuthority': 'admin'})
          loggedinuser = user.id
          session = Session(user.id)
          session.save()

          print ('saved')
          return make_response(response), 200

        return make_response(jsonify({'status': 'error', 'type' : 'account', 'currentAuthority': 'guest'})), 200

    @app.route('/api/real/logout', methods=['POST'])
    def logout():
        Session.delete_all()
        return make_response(jsonify({'status': 'ok'})), 200

    @app.route('/api/real/currentUser', methods=['GET'])
    def currentUser():

        session = Session.get_all().first()

        if session == None:
          return make_response(jsonify({'status': 'ok', 'type' : 'account', 'currentAuthority': 'guest'})), 200

        print (session.userId)
        user = User.get_all().filter(User.id == session.userId).first()

        res = user.serialise()

        response = jsonify(res)
        return make_response(response), 200

    @app.route('/api/real/targetgroups', methods=['POST'])
    def list_targetgroups():

      userId = request.data.get('userId', 0)

      user = User.get_all().filter(User.id == userId).first()

      targetgroups = TargetGroup.get_all().filter(TargetGroup.country.has(Country.id.in_(x.id for x in user.countries)))

      results = []
      for tg in targetgroups:
       results.append(tg.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/real/content', methods=['GET'])
    def list_content():

      content = Content.get_all().all()

      results = []
      for tg in content:
       results.append(tg.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/real/cards/savecamera', methods=['POST'])
    def set_camera():

      jsoncard = request.data.get('card')
      jsoncamera = request.data.get('camera')

      #fix
      card = Card.get_all().filter(Card.id.in_([jsoncard["id"]])).one()
      card.camera = jsoncamera
      card.save()

      return make_response(jsonify({}), 200)

    @app.route('/api/real/imports/gpx', methods=['GET'])
    def import_gpx():

      token = 'oekJIQrUYNIAAAAAAAAb0zcguhEZmoKSMd3VM4s5t5zTfOMvRg705-74r8RAGLVb'
      thepath = '/Apps/tapiriik/'
      dbx = dropbox.Dropbox(token)

      response = dbx.files_list_folder(path=thepath)

      for file in response.entries:
       filewithpath = thepath + file.name
       existingtrip = Trip.get_all().filter(Trip.filename == filewithpath).all()

       if (len(existingtrip) == 0) :

        #try:
        md, res = dbx.files_download(filewithpath)

        tcx = parser.TCXParser(res.content)

        waypoints = tcx.get_all()

        trip = Trip(float(tcx.distance), filewithpath)

        trip.save()

        print(trip.id)

        for waypoint in waypoints :
          waypoint = Waypoint(trip.id, waypoint[0], waypoint[1], waypoint[2])
          waypoint.save()

      return make_response(jsonify({'status': 'done'})), 200


    @app.route('/api/real/waypoints', methods=['POST'])
    def list_waypoints():

      waypoints = Waypoint.get_all().order_by(Waypoint.time).all()

      results = []

      #only get every 10th waypoint
      count = 0
      for waypoint in waypoints:
         count = count + 1

         if count % 30 == 0:
          results.append(waypoint.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/real/cards', methods=['POST'])
    def list_cards():

      userid = request.data.get('userid', '0')
      key = request.data.get('key')

      #print(key["type"])

      #sql = text('select id from cards where key->> \'type\' = \'' + key["type"] + '\' and key->>\'id\' =  \'' + str(key["id"]) + '\'')
      #result = db.engine.execute(sql)

      #cardids = []
      #for row in result:
      #    cardids.append(row[0])

      #cards = Card.get_all().filter(Card.id.in_(cardids)).all()
      cards = Card.get_all().all()

      results = []
      for card in cards:
         results.append(card.serialise())

      return make_response(jsonify({ 'list' : results })), 200


    return app


