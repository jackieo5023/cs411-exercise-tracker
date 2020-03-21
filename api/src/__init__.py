from flask import Flask, request
from flask_pymongo import PyMongo
from flask_sqlalchemy import SQLAlchemy
from bson.json_util import dumps

# db = SQLAlchemy()

app = Flask(__name__, instance_relative_config=False)
app.config.from_object('config.Config')

# db.init_app(app)

mongo = PyMongo()
mongo.init_app(app)

@app.route("/api/sql")
def index():
    return "Hello, world!"

@app.route("/api/mongo/test")
def insert_test():
    # This just inserts a new entry into the collection "testdb", document "test" where the name of the entry is "test"
    # I just wanted to provide a basic example and also make sure this worked
    client = mongo.cx
    x = client.testdb.test.insert_one({"name": "test"})
    return dumps({"id": x.inserted_id})

# def create_app():
#     """Construct the core application."""
#     app = Flask(__name__, instance_relative_config=False)
#     app.config.from_object('config.Config')
#     # db.init_app(app)

#     with app.app_context():
#         from . import routes

#         # Create tables for our models
#         # db.create_all()

#         return app