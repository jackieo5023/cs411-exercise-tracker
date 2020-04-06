from flask import Flask
from flask_pymongo import PyMongo
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__, instance_relative_config=False)
app.config.from_object('config.Config')

db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

mongo = PyMongo()
mongo.init_app(app)

with app.app_context():
    from . import routes, models

if __name__ == '__main__':
    app.run()
