from app import db
from sqlalchemy.dialects.postgresql import JSON, JSONB
import json
from sqlalchemy import Text

class DateTimeEncoder(json.JSONEncoder):
       def default(self, obj):
           if isinstance(obj, datetime):
               encoded_object = list(obj.timetuple())[0:6]
           else:
               encoded_object =json.JSONEncoder.default(self, obj)
           return encoded_object


class Trip(db.Model):
    __tablename__ = 'trip'

    id        = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String)
    distance = db.Column(db.Float)
    waypoints = db.relationship("Waypoint")

    def __init__(self, distance, filename):
        self.distance = distance
        self.filename = filename

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Trip.query

    @staticmethod
    def delete_all():
        db.session.query(Trip).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Country: {}>".format(self.id)

    def serialise(self):

        return  {
                   'id': self.id,
                   'filename' : self.filename,
                }


class Waypoint(db.Model):
    __tablename__ = 'waypoint'

    id        = db.Column(db.Integer, primary_key=True)
    longitude = db.Column(db.Float)
    latitude  = db.Column(db.Float)
    time      = db.Column(db.DateTime)
    trip_id   = db.Column('tripId', db.Integer, db.ForeignKey('trip.id'))

    def __init__(self, trip_id, longitude, latitude, time):
        self.trip_id = trip_id
        self.longitude = longitude
        self.latitude = latitude
        self.time = time

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Waypoint.query

    @staticmethod
    def delete_all():
        db.session.query(Waypoint).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Waypoint: {}>".format(self.id)

    def serialise(self):

        return  {
                   'id': self.id,
                   'trip_id'    : self.trip_id,
                   'longitude'  : self.longitude,
                   'latitude'   : self.latitude,
                   'time'   : self.time
                }


