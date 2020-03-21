from flask import current_app as app, request
from bson.json_util import dumps
from . import mongo

# https://www.w3schools.com/python/python_mongodb_insert.asp
@app.route("/api/mongo/test", methods=['POST'])
def insert_test():
    # This just inserts a new entry into the collection "testdb", document "test" where the name of the entry is "test"
    # I just wanted to provide a basic example and also make sure this worked
    client = mongo.cx
    x = client.testdb.test.insert_one({"name": "test"})
    return dumps({"id": x.inserted_id})