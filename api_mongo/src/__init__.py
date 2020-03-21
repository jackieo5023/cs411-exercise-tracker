from flask import Flask
from flask_pymongo import PyMongo

mongo = PyMongo()

def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')
    mongo.init_app(app)

    with app.app_context():
        from . import routes

        # Create tables for our models
        # db.create_all()

        return app