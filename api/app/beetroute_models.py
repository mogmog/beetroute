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
    geojson  = db.Column(JSON)

    def __init__(self, geojson, filename):
        self.geojson = geojson
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
                   'geojson' : self.geojson
                }

