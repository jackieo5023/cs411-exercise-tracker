from flask import current_app as app, request
from bson.json_util import dumps
from . import mongo
import pymongo

@app.route("/api")
def home():
    return "Hello, world!"

# https://www.w3schools.com/python/python_mongodb_insert.asp
@app.route("/api/test")
def insert_test():
    # This just inserts a new entry into the collection "testdb", document "test" where the name of the entry is "test"
    # I just wanted to provide a basic example and also make sure this worked

    client = pymongo.MongoClient("mongodb://test:cs411@cluster0-shard-00-00-llf4k.mongodb.net:27017,cluster0-shard-00-01-llf4k.mongodb.net:27017,cluster0-shard-00-02-llf4k.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")
    db = client.test

    x = db.test.insert_one({"name": "test"})
    return dumps({"id": x.inserted_id})
@app.route("/workouts")
def workouts_insert():
    client = pymongo.MongoClient("mongodb://test:cs411@cluster0-shard-00-00-llf4k.mongodb.net:27017,cluster0-shard-00-01-llf4k.mongodb.net:27017,cluster0-shard-00-02-llf4k.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")
    db = client.test
    x = db.workouts.insert_one({"type": "running"})
    return "Workouts loaded."
