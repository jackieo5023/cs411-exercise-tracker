from flask import current_app as app, request
from bson.json_util import dumps
from bson.objectid import ObjectId
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
            
            x = db.workouts.insert_one({"type": "Bicycling", "METs": 8.0, "equipment": ["bike"]})
            x = db.workouts.insert_one({"type": "Jumping rope", "METs": 12.3, "equipment": ["rope"]})
            x = db.workouts.insert_one({"type": "Hatha Yoga", "METs": 2.5, "equipment": []})
            x = db.workouts.insert_one({"type": "Running", "METs": 9.8, "equipment": []})
            x = db.workouts.insert_one({"type": "Golf", "METs": 4.3, "equipment": ["golf club", "golf ball"]})
            x = db.workouts.insert_one({"type": "Tennis", "METs": 8.0, "equipment": ["tennis racket", "tennis ball"]})
            x = db.workouts.insert_one({"type": "Basketball", "METs": 6.5, "equipment": ["basketball"]})
            x = db.workouts.insert_one({"type": "Swimming laps", "METs": 5.8, "equipment": ["pool"]})
            x = db.workouts.insert_one({"type": "Hiking", "METs": 7.3, "equipment": []})
            x = db.workouts.insert_one({"type": "Stationary cycling", "METs": 6.8, "equipment": ["stationary bike"]})
            x = db.workouts.insert_one({"type": "Circuit training", "METs": 8.0, "equipment": ["bike"]})
            x = db.workouts.insert_one({"type": "Yardwork", "METs": 5.0, "equipment": []})
            x = db.workouts.insert_one({"type": "Gardening", "METs": 3.8, "equipment": []})
            x = db.workouts.insert_one({"type": "Walking for exercise", "METs": 4.3, "equipment": []})
            x = db.workouts.insert_one({"type": "Exercise/activity-based video game", "METs": 3.8, "equipment": ["video game"]})
            x = db.workouts.insert_one({"type": "Video-exercise (DVD/TV) cardio", "METs": 4.0, "equipment": ["exercise video"]})
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

        db.session.execute(
            "DELETE FROM CompletedWorkout WHERE personId=:personId",
            {"personId": person_id}
        )
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

    person_id = request.headers.get("id")
    if not person_id:
        return {"status": 400, "message": "Missing header"}

    if request.method == "GET":
        is_completed = request.args.get('completed') == 'true'
        
        if is_completed:
            result = db.session.execute(
                "SELECT * FROM CompletedWorkout WHERE personId=:personId",
                {"personId": person_id},
            )
            completed_workouts = result.fetchall()
            result.close()
            completed_workouts = [dict(workout.items()) for workout in completed_workouts]

            workouts = client.test.workouts.find({"_id": {"$in": [ObjectId(workout['workoutId']) for workout in completed_workouts]}})
            final_workouts = []
            for workout in workouts:
                temp = workout
                temp["_id"] = str(workout["_id"])
                final_workouts.append(temp)
            if workouts:
                return {"status": 200, "message": "Workouts found", "workouts": final_workouts}
            return {"status": 400, "message": "Workouts not found"}
        else:
            final_workouts = recommend(person_id)

            return {"status": 200, "workouts": final_workouts}
    elif request.method == "POST":
        body = request.get_json()
        if not body:
            return {"status": 400, "message": "Invalid body"}
        
        type_workout = body.get("type")
        METs = body.get("METs")
        equipment = body.get("equipment")
        if not type_workout or not METs:
            return {"status": 400, "message": "Missing field"}
        if not equipment:
            equipment = []

        inserted = client.test.workouts.insert_one({"type": type_workout,"METs": METs, "equipment": equipment})
        result = db.session.execute(
            "INSERT INTO CompletedWorkout (personId, workoutId) VALUES (:personId, :workoutId)",
            {"personId": person_id, "workoutId": str(inserted.inserted_id)},
        )
        db.session.commit()

        return {"status": 201, "message": "Workout added"}
    elif request.method == "DELETE":
        body = request.get_json()
        if not body:
            return {"status": 400, "message": "Invalid body"}
        
        workoutId = body.get("workoutId")
        if not workoutId:
            return {"status": 400, "message": "Missing field"}
        
        result = db.session.execute(
            "DELETE FROM CompletedWorkout WHERE personId=:personId AND workoutId=:workoutId",
            {"personId": person_id, "workoutId": workoutId}
        )
        db.session.commit()
        client.test.workouts.delete_one({"_id": ObjectId(workoutId)})

        return {"status": 204, "message": "Workout deleted"}
    else:
        return {"status": 400, "message": "Invalid request type"}

@app.route("/api/insert_completed_workouts", methods=['POST'])
def insert_completed_workouts():
    body = request.get_json()
    if not body:
        return {"status": 400, "message": "Invalid body"}
    personid = body.get("personId")
    workoutid = body.get("workoutId")
    id = body.get("id")
    if not personid or not workoutid or not id:
        return {"status": 400, "message": "Missing field"}
    try:
        result = db.session.execute(
            "INSERT INTO Completedworkout (id, personId, workoutId) VALUES (:id, :personId, :workoutId)",
            {"id": id, "personId": personid, "workoutId": workoutid},
        )
        db.session.commit()
    except IntegrityError:
        return {"status": 409, "message": "Workout is already completed"}
    except Exception as e:
        return {"status": 500, "message": "Something went wrong"}

    ins_id = db.session.execute("SELECT LAST_INSERT_ID() as id").fetchone()
    return {"status": 201, "message": "Completed workout added", "id": ins_id["id"]}

def recommend(id):
    if not id:
        return []

    result = db.session.execute(
        "SELECT weight, height FROM people WHERE id =:id",
        {"id": id},
    )
    wh = result.fetchone()
    result.close()

    BMI = 703 * wh[0] / (wh[1]*wh[1])
    recommend_workouts = []
    client = mongo.cx
    if BMI < 18.5:
        workouts = client.test.workouts.find({"METs": {'$lte': 5.0}},{"type":1,"METs":1,"equipment":1})
        for workout in workouts:
            temp = workout
            temp["_id"] = str(workout["_id"])
            recommend_workouts.append(temp)
    elif BMI < 25:
        workouts = client.test.workouts.find({"METs": {'$gte': 8.0,'$lte': 15.0}},{"type":1,"METs":1,"equipment":1})
        for workout in workouts:
            temp = workout
            temp["_id"] = str(workout["_id"])
            recommend_workouts.append(temp)
    elif BMI < 30:
        workouts = client.test.workouts.find({"METs": {'$gte': 5.1,'$lte': 7.5}},{"type":1,"METs":1,"equipment":1})
        for workout in workouts:
            temp = workout
            temp["_id"] = str(workout["_id"])
            recommend_workouts.append(temp)
    else:
        workouts = client.test.workouts.find({"METs": {'$lte': 5.0}},{"type":1,"METs":1,"equipment":1})
        for workout in workouts:
            temp = workout
            temp["_id"] = str(workout["_id"])
            recommend_workouts.append(temp)

    return recommend_workouts

@app.route("/api/recipe", methods=['GET', 'POST', 'DELETE'])
def What_I_eat():
    person_id = request.headers.get("id")
    if not person_id:
        return {"status": 400, "message": "Missing header"}

    if request.method == "GET":
        result = db.session.execute(
            "SELECT * FROM Recipe WHERE personId =:id",
            {"id": person_id},
        )
        food = result.fetchall()
        result.close()

        return {"status": 200, "message": "Food found", "food": [dict(f.items()) for f in food]}
    elif request.method == "POST":
        body = request.get_json()
        if not body:
            return {"status": 400, "message": "Invalid body"}

        name = body.get("recipeName")
        protein = body.get("protein")
        #vitamin = body.get("vitamin")
        calories = body.get("calories")
        if not name or not protein or not calories:
            return {"status": 400, "message": "Missing field"}
        try:
            result = db.session.execute(
                "INSERT INTO Recipe (recipeName, protein, calories, personId) VALUES (:name, :protein, :calories, :id)",
                {"name": name, "protein": protein, "calories": calories, "id": person_id},
            )
            db.session.commit()
        except IntegrityError:
            return {"status": 409, "message": "Recipe already exists"}
        except Exception as e:
            return {"status": 500, "message": "Something went wrong"}

        ins_id = db.session.execute("SELECT LAST_INSERT_ID() as id").fetchone()
        return {"status": 201, "message": "Recipe created", "id": ins_id["id"]}
    elif request.method == "DELETE":
        body = request.get_json()
        if not body:
            return {"status": 400, "message": "Invalid body"}

        recipe_id = body.get("recipeId")
        if not recipe_id:
            return {"status": 400, "message": "Invalid body"}
        
        try:
            result = db.session.execute(
                "DELETE FROM Recipe WHERE recipeId=:recipeId",
                {"recipeId": recipe_id},
            )
            db.session.commit()
        except Exception as e:
            return {"status": 500, "message": "Something went wrong"}
        if not result:
            return {"status": 404, "message": "Recipe not found"}
        return {"status": 204, "message": "Recipe deleted"}
    else:
        return {"status": 400, "message": "Invalid request type"}

@app.route("/api/recommended_recipes", methods=['GET'])
def recommended_recipes():
    person_id = request.headers.get("id")
    if not person_id:
        return {"status": 400, "message": "Missing header"}

    result = db.session.execute(
        "SELECT firstName, recipeName, protein, calories FROM people JOIN Recipe ON people.id=Recipe.personId WHERE people.id <> :id",
        {"id": person_id},
    )
    food = result.fetchall()
    result.close()

    return {"status": 200, "message": "Food found", "food": [dict(f.items()) for f in food]}