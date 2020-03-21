from flask import Flask, request
from flask_pymongo import PyMongo
from bson.json_util import dumps

mongo = PyMongo()
app = Flask(__name__, instance_relative_config=False)
app.wsgi_app = ProxyFix(app.wsgi_app)
app.config.from_object('config.Config')
mongo.init_app(app)

@app.route("/api/mongo/test")
def insert_test():
    # This just inserts a new entry into the collection "testdb", document "test" where the name of the entry is "test"
    # I just wanted to provide a basic example and also make sure this worked
    print(x)
    client = mongo.cx
    x = client.testdb.test.insert_one({"name": "test"})
    print(x)
    return dumps({"id": x.inserted_id})

# def create_app():
#     """Construct the core application."""
#     app = Flask(__name__, instance_relative_config=False)
#     app.config.from_object('config.Config')
#     mongo.init_app(app)

#     with app.app_context():
#         from . import routes

#         # Create tables for our models
#         # db.create_all()

#         return app