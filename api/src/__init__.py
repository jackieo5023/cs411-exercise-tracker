from flask import Flask
from flask_pymongo import PyMongo
from flask_sqlalchemy import SQLAlchemy

## db = SQLAlchemy()

app = Flask(__name__, instance_relative_config=False)
app.config.from_object('config.Config')

## db.init_app(app)

mongo = PyMongo()
mongo.init_app(app)

with app.app_context():
    from . import routes

if __name__ == '__main__':
    app.run()
