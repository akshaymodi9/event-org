from .db import db


class events(db.Model):
    
    __tablename__ = 'events'

    id = db.Column(db.Integer,primary_key=True)
    event_name = db.Column(db.String(100))
    location = db.Column(db.String(100))
    description = db.Column(db.String(200))
    owner_id = db.Column(db.Integer)
    event_date = db.Column(db.DateTime)

    def __init__(self, data):
        self.event_name = data['event_name']
        self.location = data['location']
        self.description = data['description']
        self.owner_id = data['owner_id']
        self.event_date = data['event_date']


    def as_dict(self):
        """ Dict representation """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class user(db.Model):

    __tablename__ = 'user'

    id = db.Column(db.Integer,primary_key=True)
    user_name = db.Column(db.String(100))
    password = db.Column(db.String(500))
    email = db.Column(db.String(50))
    mobile_no = db.Column(db.Integer)

    def __int__(self,user_name,password,email,mobile_no):
        self.user_name = user_name
        self.password = password
        self.email = email
        self.mobile_no = mobile_no
    

    def as_dict(self):
        """ Dict representation """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class shared_events(db.Model):

    __tablename__ = 'shared_events'

    id = db.Column(db.Integer,primary_key=True)
    event_id = db.Column(db.Integer,db.ForeignKey('events.id'))
    event_name = db.Column(db.String(100))
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    owner_id = db.Column(db.Integer)

    def __init__(self,data,i):
        self.event_id = data['event_id']
        self.event_name = data['event_name']
        self.user_id = i
        self.owner_id = data['owner_id']

    def as_dict(self):
        """ Dict representation """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}



