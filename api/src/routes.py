from flask import current_app as app, request
from bson.json_util import dumps
from . import mongo, db

@app.route("/api")
def home():
    return "Hello, world!"

# https://www.w3schools.com/python/python_mongodb_insert.asp
@app.route("/api/test")
def insert_test():
    # This just inserts a new entry into the collection "testdb", document "test" where the name of the entry is "test"
    # I just wanted to provide a basic example and also make sure this worked
    client = mongo.cx
    x = client.testdb.test.insert_one({"name": "test"})
    return dumps({"id": x.inserted_id})

@app.route("/api/register", methods=['POST'])
def register():
    body = request.get_json()
    print(body)
    if not body:
        return {"status": 400, "message": "Invalid body"}
    
    name = body.get("name")
    gender = body.get("gender")
    weight = body.get("weight")
    height = body.get("height")
    age = body.get("age")

    if not name or not gender or not weight or not height or not age:
        return {"status": 400, "message": "Missing field"}

    # Getting new publicId
    result = db.session.execute("SELECT * FROM Person ORDER BY publicId")
    print(result)

    # try:
    #     result = db.session.execute(
    #         "INSERT INTO User (username, password) VALUES (:username, :password)",
    #         {"username": username, "password": password},
    #     )
    #     db.session.commit()
    # except IntegrityError:
    #     return create_response(status=409, message="User already exists")
    # except Exception as e:
    #     return create_response(status=500, message="Something went wrong")