from flask import current_app as app, request
from bson.json_util import dumps
from sqlalchemy.exc import IntegrityError
from . import mongo, db
import pymongo

mongo_string = "mongodb://test:cs411@cluster0-shard-00-00-llf4k.mongodb.net:27017,cluster0-shard-00-01-llf4k.mongodb.net:27017,cluster0-shard-00-02-llf4k.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

@app.route("/api")
def home():
    return "Hello, world!"

# https://www.w3schools.com/python/python_mongodb_insert.asp
@app.route("/api/test")
def insert_test():
    # This just inserts a new entry into the collection "testdb", document "test" where the name of the entry is "test"
    # I just wanted to provide a basic example and also make sure this worked

    client = mongo.cx
    db = client.test

    x = db.test.insert_one({"name": "test"})
    return dumps({"id": x.inserted_id})

@app.route("/api/workouts_reload", methods=['POST'])
def workouts_reload():
    client = mongo.cx
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    reload_db = body.get("reload_db") == 'true'
    if (reload_db == True):
        db = client.test
        try:
            x = db.workouts.drop()
            if (x == False):
                return {"status": 400, "message": "Collection drop failed"}
            
            x = db.workouts.insert_one({"type": "Bicycling", "METs": "8.0"})
            x = db.workouts.insert_one({"type": "Jumping rope", "METs": "12.3"})
            x = db.workouts.insert_one({"type": "Hatha Yoga", "METs": "2.5"})
            x = db.workouts.insert_one({"type": "Running", "METs": "9.8"})
            x = db.workouts.insert_one({"type": "Golf", "METs": "4.3"})
            x = db.workouts.insert_one({"type": "Tennis", "METs": "8.0"})
            x = db.workouts.insert_one({"type": "Basketball", "METs": "6.5"})
            x = db.workouts.insert_one({"type": "Swimming laps", "METs": "5.8"})
            x = db.workouts.insert_one({"type": "Hiking", "METs": "7.3"})
            x = db.workouts.insert_one({"type": "Stationary cycling", "METs": "6.8"})
            x = db.workouts.insert_one({"type": "Circuit training", "METs": "8.0"})
            x = db.workouts.insert_one({"type": "Yardwork", "METs": "5.0"})
            x = db.workouts.insert_one({"type": "Gardening", "METs": "3.8"})
            x = db.workouts.insert_one({"type": "Walking for exercise", "METs": "4.3"})
            x = db.workouts.insert_one({"type": "Exercise/activity-based video game", "METs": "3.8"})
            x = db.workouts.insert_one({"type": "Video-exercise (DVD/TV) cardio", "METs": "4.0"})
        except pymongo.errors.DuplicateKeyError as e:
            return {"status": 409, "message": "Workouts already exists"}
        except Exception as e:
            return {"status": 500, "message": "Something went wrong"}
    return {"status": 201, "message": "Workouts reloaded"}

@app.route("/api/workouts_insert", methods=['POST'])
def workouts_insert():
    client = mongo.cx
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    workoutName = body.get("workoutName")
    mets = body.get("METs")
    if not workoutName or not mets:
        return {"status": 400, "message": "Missing field"}
    db = client.test
    try:
        ins_id = db.workouts.insert_one({"type": workoutName,"Mets": mets})
    except IntegrityError:
        return {"status": 409, "message": "Workouts already exists"}
    except Exception as e:
        return {"status": 500, "message": "Something went wrong"}
    return {"status": 201, "message": "Workouts added","id": ins_id["id"]}

@app.route("/api/workouts_delete", methods=['DELETE'])
def workouts_delete():
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    workoutName = body.get("workoutName")
    if not workoutName:
        return {"status": 400, "message": "Missing field"}
    client = mongo.cx
    db = client.test
    try:
        x = db.workouts.delete_one({"type":workoutName})
    except pymongo.errors.CursorNotFound as e:
        return {"status": 409, "message": "Workouts not found"}
    except Exception as e:
        return {"status": 500, "message": "Something went wrong"}
    return {"status": 201, "message": "Workouts deleted"}

@app.route("/api/register", methods=['POST'])
def register():
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}

    firstName = body.get("firstName")
    gender = body.get("gender")
    weight = body.get("weight")
    height = body.get("height")
    age = body.get("age")
    lastName = body.get("lastName")

    if not firstName or not lastName or not gender or not weight or not height or not age:
        return {"status": 400, "message": "Missing field"}

    try:
        result = db.session.execute(
            "INSERT INTO people (firstName, gender, weight, height, age, lastName) VALUES (:firstName, :gender, :weight, :height, :age, :lastName)",
            {"firstName": firstName, "gender": gender, "weight": weight, "height": height, "age": age, "lastName": lastName},
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

@app.route("/api/me", methods=['GET', 'PUT', 'DELETE'])
def me():
    if request.method == "GET":
        person_id = request.headers.get("id")
        if not person_id:
            return {"status": 400, "message": "Missing header"}

        result = db.session.execute(
            "SELECT * FROM people WHERE id=:id",
            {"id": person_id},
        )
        person = result.fetchone()
        result.close()
        
        if person:
            return {"status": 200, "message": "Person found", "person": dict(person.items())}
        return {"status": 400, "message": "Person not found"}
    elif request.method == "PUT":
        body = request.get_json()
        if not body:
            return {"status": 400, "message": "Invalid body"}
        
        person_id = body.get("id")
        firstName = body.get("firstName")
        gender = body.get("gender")
        weight = body.get("weight")
        height = body.get("height")
        age = body.get("age")
        lastName = body.get("lastName")
        if not person_id or not firstName or not lastName or not gender or not weight or not height or not age:
            return {"status": 400, "message": "Missing field"}
        
        result = db.session.execute(
            "UPDATE people SET firstName=:firstName, gender=:gender, weight=:weight, height=:height, age=:age, lastName=:lastName WHERE id=:id",
            {"firstName": firstName, "gender": gender, "weight": weight, "height": height, "age": age, "lastName": lastName, "id": person_id}
        )
        db.session.commit()

        return {"status": 204, "message": "Person updated"}
    elif request.method == "DELETE":
        person_id = request.headers.get("id")
        if not person_id:
            return {"status": 400, "message": "Missing header"}

        result = db.session.execute(
            "DELETE FROM people WHERE id=:id",
            {"id": person_id}
        )
        db.session.commit()

        return {"status": 204, "message": "Person deleted"}
    else:
        return {"status": 400, "message": "Invalid request type"}
    
@app.route("/api/me/workout", methods=['GET', 'POST', 'DELETE'])
def workouts():
    client = mongo.cx
    if request.method == "GET":
        is_completed = request.args.get('completed') == 'true'
        
        if is_completed:
            person_id = request.headers.get("id")
            if not person_id:
                return {"status": 400, "message": "Missing header"}

            result = db.session.execute(
                "SELECT * FROM CompletedWorkout WHERE personId=:personId",
                {"personId": person_id},
            )
            completed_workouts = result.fetchall()
            result.close()
            completed_workouts = [dict(workout.items()) for workout in completed_workouts]

            workouts = client.test.workouts.find({"_id": {"$in": [workout.workoutId for workout in completed_workouts]}}, {"type": 1, "METs": 1, "_id": 0})
            if workouts:
                return {"status": 200, "message": "Workouts found", "workouts": list(workouts)}
            return {"status": 400, "message": "Workouts not found"}
        else:
            workouts = client.test.workouts.find({}, {"type": 1, "METs": 1, "_id": 0})

            return {"status": 200, "workouts": list(workouts)}
        
    return "hi"


@app.route("/api/find_recipe", methods=['GET'])
def find_recipe():
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    recipeName = body.get("recipeName")
    if not recipeName:
        return {"status": 400, "message": "Missing field"}
    result = db.session.execute(
        "SELECT protein,vitamin,calories FROM Recipe WHERE name =:recipeName",
        {"name": recipeName},
    )
    Facts = result.fetchone()
    result.close()

    if Facts:
        return {"status": 200, "message": "Recipe found"}
    return {"status": 404, "message": "Recipe not found"}

@app.route("/api/insert_recipe", methods=['POST'])
def insert_recipe():
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    name = body.get("recipeName")
    protein = body.get("protein")
    vitamin = body.get("vitamin")
    calories = body.get("calories")

    if not name or not protein or not vitamin or not calories:
        return {"status": 400, "message": "Missing field"}
    try:
        result = db.session.execute(
            "INSERT INTO Recipe (name, protein, vitamin, calories) VALUES (:name, :protein, :vitamin, :calories)",
            {"name": name, "protein": protein, "vitamin": vitamin, "calories": calories},
        )
        db.session.commit()
    except IntegrityError:
        return {"status": 409, "message": "Recipe already exists"}
    except Exception as e:
        return {"status": 500, "message": "Something went wrong"}

    ins_id = db.session.execute("SELECT LAST_INSERT_ID() as id").fetchone()
    return {"status": 201, "message": "Recipe created", "id": ins_id["id"]}

@app.route("/api/delete_recipe", methods=['DELETE'])
def delete_recipe():
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    name = body.get("recipeName")

    if not name:
        return {"status": 400, "message": "Invalid body"}
    
    try:
        result = db.session.execute(
            "DELETE FROM Recipe WHERE name = :name",
            {"name": name},
        )
        db.session.commit()
    except Exception as e:
        return {"status": 500, "message": "Something went wrong"}
    if not result:
        return {"status": 404, "message": "Recipe not found"}
    return {"status": 201, "message": "Recipe deleted"}