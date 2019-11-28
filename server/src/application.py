import os

from flask import Flask
from . import auth
from . import event
from .db import db
from flask_cors import CORS, cross_origin

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    print(__name__,str(__package__))
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
        # DATABASE=os.path.join(app.instance_path, 'server.sqlite'),
    )

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:rootroot@eventmanagement1.cw1sqcel1huq.us-east-1.rds.amazonaws.com/event_org'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # # ensure the instance folder exists
    # try:
    #     os.makedirs(app.instance_path)
    # except OSError:
    #     pass
    
    db.init_app(app)
    app.register_blueprint(auth.bp)
    app.register_blueprint(event.bp)
    app.add_url_rule('/', endpoint='index')
    with app.app_context():
        db.create_all()

    return app