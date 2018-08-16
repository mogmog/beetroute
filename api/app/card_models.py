from app import db
from app.user_models import User

from sqlalchemy import Text

from sqlalchemy.dialects.postgresql import JSON, JSONB

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)

    component = db.Column(db.String(255))

    key = db.Column(JSONB(astext_type=Text()))
    data = db.Column(db.JSON)
    marker = db.Column(db.JSON)
    camera = db.Column(db.JSON)
    cameraOptions = db.Column(db.JSON)
    instagram = db.Column(db.JSON)

    def __init__(self, component, key, data, marker, camera, cameraOptions, instagram):
        self.component = component
        self.key = key
        self.data = data
        self.marker = marker
        self.camera = camera
        self.cameraOptions = cameraOptions
        self.instagram = None

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Card.query

    @staticmethod
    def delete_all():
        db.session.query(Card).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Card: {}>".format(self.id)

    def serialise(self):

        return  {
                   'id': self.id,
                   'component' : self.component,
                   'key' : self.key,
                   'data' : self.data,
                   'marker' : self.marker,
                   'camera' : self.camera,
                   'cameraOptions' : self.cameraOptions,
                   'instagram' : self.instagram
                }



