from flask import current_app as app, request
from bson.json_util import dumps
from sqlalchemy.exc import IntegrityError
from . import mongo, db
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

@app.route("/api/register", methods=['POST'])
def register():
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    
    name = body.get("name")
    gender = body.get("gender")
    weight = body.get("weight")
    height = body.get("height")
    age = body.get("age")

    if not name or not gender or not weight or not height or not age:
        return {"status": 400, "message": "Missing field"}

    try:
        result = db.session.execute(
            "INSERT INTO people (name, gender, weight, height, age) VALUES (:name, :gender, :weight, :height, :age)",
            {"name": name, "gender": gender, "weight": weight, "height": height, "age": age},
        )
        db.session.commit()
    except IntegrityError:
        return {"status": 409, "message": "Person already exists"}
    except Exception as e:
        return {"status": 500, "message": "Something went wrong"}

    ins_id = db.session.execute("SELECT LAST_INSERT_ID() as id").fetchone()
    return {"status": 201, "message": "Person created", "id": ins_id["id"]}

@app.route("/api/login", methods=['POST'])
def login():
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    
    person_id = body.get("id")

    if not person_id:
        return {"status": 400, "message": "Missing field"}

    result = db.session.execute(
        "SELECT id FROM people WHERE id=:id",
        {"id": person_id},
    )
    person = result.fetchone()
    result.close()

    if person:
        return {"status": 200, "message": "Person found", "id": person_id}
    return {"status": 404, "message": "Person not found"}
