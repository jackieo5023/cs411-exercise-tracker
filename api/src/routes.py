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
            x = db.workouts.insert_one({"type": "Fishing", "METs": 2.5, "equipment": ["Fishing rod", "fishing wire", "bait"]})
            x = db.workouts.insert_one({"type": "Cleaning", "METs": 5.0, "equipment": []})
            x = db.workouts.insert_one({"type": "Mowing lawn", "METs": 6.0, "equipment": []})
            x = db.workouts.insert_one({"type": "Badminton", "METs": 8.0, "equipment": ["Badminton racket", "badminton birdie"]})
            x = db.workouts.insert_one({"type": "Jogging at 6 mph", "METs": 8.0, "equipment": []})
            x = db.workouts.insert_one({"type": "Shoveling", "METs": 7.8, "equipment": ["Shovel"]})
            x = db.workouts.insert_one({"type": "Carrying heavy loads", "METs": 9.9, "equipment": []})
            x = db.workouts.insert_one({"type": "Soccer", "METs": 9.6, "equipment": ["Soccer ball"]})
            x = db.workouts.insert_one({"type": "Football", "METs": 10.0, "equipment": ["Football"]})
            x = db.workouts.insert_one({"type": "Health club exercise", "METs": 5.5, "equipment": ["Gym"]})
            x = db.workouts.insert_one({"type": "Indoor ski", "METs": 7.0, "equipment": ["Ski machine"]})
            x = db.workouts.insert_one({"type": "Water aerobics", "METs": 8.0, "equipment": ["swimming pool"]})
            x = db.workouts.insert_one({"type": "weight lifting", "METs": 3.0, "equipment": []})
            x = db.workouts.insert_one({"type": "whirlpool", "METs": 1.0, "equipment": ["whirlpool"]})
            x = db.workouts.insert_one({"type": "ballet or modern", "METs": 4.8, "equipment": []})
            x = db.workouts.insert_one({"type": "aerobic, general", "METs": 6.5, "equipment": []})
            x = db.workouts.insert_one({"type": "aerobic, step, with 6 – 8 inch step", "METs": 8.5, "equipment": []})
            x = db.workouts.insert_one({"type": "aerobic, step, with 10 – 12 inch step", "METs": 10.0, "equipment": []})
            x = db.workouts.insert_one({"type": "aerobic, low impact", "METs": 5.0, "equipment": []})
            x = db.workouts.insert_one({"type": "aerobic, high impact", "METs": 7.0, "equipment": []})
            x = db.workouts.insert_one({"type": "digging worms, with shovel", "METs": 4.0, "equipment": ["Shovel", "worms"]})
            x = db.workouts.insert_one({"type": "fishing from river bank and walking", "METs": 4.0, "equipment": ["fishing rod", "fishing wire"]})
            x = db.workouts.insert_one({"type": "fishing from boat, sitting", "METs": 2.5, "equipment": ["Fishing rod", "fishing wire", "boat"]})
            x = db.workouts.insert_one({"type": "fishing from river bank, standing", "METs": 3.5, "equipment": ["Fishing rod", "fishing wire"]})
            x = db.workouts.insert_one({"type": "fishing in stream, in waders", "METs": 6.0, "equipment": ["Fishing rod", "fishing wire"]})
            x = db.workouts.insert_one({"type": "fishing, ice, sitting", "METs": 2.0, "equipment": ["Fishing rod", "fishing wire"]})
            x = db.workouts.insert_one({"type": "wash dishes - standing or in general", "METs": 2.3, "equipment": []})
            x = db.workouts.insert_one({"type": "wash dishes; clearing dishes from table – walking", "METs": 2.5, "equipment": []})
            x = db.workouts.insert_one({"type": "bowling", "METs": 3.0, "equipment": ["Bowling course"]})
            x = db.workouts.insert_one({"type": "boxing, in ring, general", "METs": 12.0, "equipment": ["boxing ring"]})
            x = db.workouts.insert_one({"type": "boxing, punching bag", "METs": 6.0, "equipment": ["punching bag"]})
            x = db.workouts.insert_one({"type": "broomball", "METs": 7.0, "equipment": ["hockey rink", "broomball ball", "broomball stick"]})
            x = db.workouts.insert_one({"type": "football, competitive", "METs": 9.0, "equipment": ["football"]})
            x = db.workouts.insert_one({"type": "football, touch, flag, general ", "METs": 8.0, "equipment": ["football"]})
            x = db.workouts.insert_one({"type": "football or baseball, playing catch", "METs": 3.0, "equipment": ["football/baseball"]})
            x = db.workouts.insert_one({"type": "horseback riding, general", "METs": 4.0, "equipment": ["horse"]})
            x = db.workouts.insert_one({"type": "horseback riding, saddling horse", "METs": 3.5, "equipment": ["horse", "saddle"]})
            x = db.workouts.insert_one({"type": "horseback riding, trotting", "METs": 6.5, "equipment": ["horse"]})
            x = db.workouts.insert_one({"type": "horseback riding, walking", "METs": 2.5, "equipment": ["horse"]})
            x = db.workouts.insert_one({"type": "horseshoe pitching, quoits", "METs": 3.0, "equipment": ["horse"]})
            x = db.workouts.insert_one({"type": "motor-cross", "METs": 4.0, "equipment": ["motor-cycle"]})
            x = db.workouts.insert_one({"type": "paddleball, competitive", "METs": 10.0, "equipment": ["paddleball"]})
            x = db.workouts.insert_one({"type": "paddleball, casual, general", "METs": 6.0, "equipment": ["paddleball"]})
            x = db.workouts.insert_one({"type": "racquetball, competitive", "METs": 10.0, "equipment": ["racquetball"]})
            x = db.workouts.insert_one({"type": "racquetball, casual, general ", "METs": 7.0, "equipment": ["racquetball"]})
            x = db.workouts.insert_one({"type": "rock climbing, ascending rock", "METs": 11.0, "equipment": ["Climbing Rope", "harness"]})
            x = db.workouts.insert_one({"type": "rock climbing, rappelling", "METs": 8.0, "equipment": ["Climbing Rope", "harness"]})
            x = db.workouts.insert_one({"type": "rope jumping, fast", "METs": 12.0, "equipment": ["Jumping Rope"]})
            x = db.workouts.insert_one({"type": "rope jumping, moderate, general", "METs": 10.0, "equipment": ["Jumping Rope"]})
            x = db.workouts.insert_one({"type": "rope jumping, slow", "METs": 8.0, "equipment": ["Jumping Rope"]})
            x = db.workouts.insert_one({"type": "rugby", "METs": 10.0, "equipment": ["oval ball"]})
            x = db.workouts.insert_one({"type": "shuffleboard, lawn bowling", "METs": 3.0, "equipment": ["shuffleboard"]})
            x = db.workouts.insert_one({"type": "skateboarding", "METs": 5.0, "equipment": ["skateboard"]})
            x = db.workouts.insert_one({"type": "skating, roller", "METs": 7.0, "equipment": ["roller skates"]})
            x = db.workouts.insert_one({"type": "sky diving", "METs": 3.5, "equipment": ["parachute"]})
            x = db.workouts.insert_one({"type": "soccer, competitive", "METs": 10.0, "equipment": ["soccer ball"]})
            x = db.workouts.insert_one({"type": "soccer, casual, general ", "METs": 7.0, "equipment": ["soccer ball"]})
            x = db.workouts.insert_one({"type": "softball or baseball, fast or slow pitch, general ", "METs": 5.0, "equipment": ["softball/baseball"]})
            x = db.workouts.insert_one({"type": "softball, officiating", "METs": 4.0, "equipment": ["softball"]})
            x = db.workouts.insert_one({"type": "softball, pitching", "METs": 6.0, "equipment": ["softball"]})
            x = db.workouts.insert_one({"type": "squash", "METs": 12.0, "equipment": ["tenis ball"]})
            x = db.workouts.insert_one({"type": "table tennis, ping pong", "METs": 8.0, "equipment": ["ping-pong ball", "ping-pong table"]})
            x = db.workouts.insert_one({"type": "tennis, general", "METs": 7.0, "equipment": ["tennis racket", "tennis ball"]})
            x = db.workouts.insert_one({"type": "tennis, doubles", "METs": 6.0, "equipment": ["tennis racket", "tennis ball"]})
            x = db.workouts.insert_one({"type": "volleyball", "METs": 4.0, "equipment": ["volleyball"]})
            x = db.workouts.insert_one({"type": "volleyball, competitive", "METs": 8.0, "equipment": ["volleyball", "net"]})
            x = db.workouts.insert_one({"type": "volleyball, non-competitive, 6 - 9 member team, genera", "METs": 3.0, "equipment": ["volleyball"]})
            x = db.workouts.insert_one({"type": "volleyball, beach", "METs": 8.0, "equipment": ["volleyball"]})
            x = db.workouts.insert_one({"type": "wrestling", "METs": 8.0, "equipment": []})
            x = db.workouts.insert_one({"type": "boating, power", "METs": 2.5, "equipment": ["Boat"]})
            x = db.workouts.insert_one({"type": "canoeing, on camping trip (Taylor Code 270)", "METs": 4.0, "equipment": ["canoe"]})
            x = db.workouts.insert_one({"type": "canoeing, harvesting wild rice, knocking rice off the stalks", "METs": 3.3, "equipment": ["canoe"]})
            x = db.workouts.insert_one({"type": "canoeing, portaging", "METs": 7.0, "equipment": ["canoe"]})
            x = db.workouts.insert_one({"type": "canoeing, rowing, 2.0-3.9 mph, light effort", "METs": 3.0, "equipment": ["canoe"]})
            x = db.workouts.insert_one({"type": "canoeing, rowing, 4.0-5.9 mph, moderate effort", "METs": 7.0, "equipment": ["canoe"]})
            x = db.workouts.insert_one({"type": "canoeing, rowing, >6 mph, vigorous effort", "METs": 12.0, "equipment": ["canoe"]})
            x = db.workouts.insert_one({"type": "canoeing, rowing, for pleasure, general", "METs": 3.5, "equipment": ["canoe"]})
            x = db.workouts.insert_one({"type": "canoeing, rowing, in competition, or crew or sculling", "METs": 12.0, "equipment": ["canoe"]})
            x = db.workouts.insert_one({"type": "diving, springboard or platform", "METs": 3.0, "equipment": ["diving equipment"]})
            x = db.workouts.insert_one({"type": "sailing, boat and board sailing, windsurfing, ice sailing, general", "METs": 3.0, "equipment": ["ship"]})
            x = db.workouts.insert_one({"type": "sailing, in competition", "METs": 5.0, "equipment": ["ship"]})
            x = db.workouts.insert_one({"type": "sailing, Sunfish/Laser/Hobby Cat, Keel boats, ocean sailing", "METs": 3.0, "equipment": ["ship"]})
            x = db.workouts.insert_one({"type": "skiing, general", "METs": 8.0, "equipment": ["Skis"]})
            x = db.workouts.insert_one({"type": "skiing, cross country, 2.5 mph, slow or light effort, ski walking", "METs": 7.0, "equipment": ["skis"]})
            x = db.workouts.insert_one({"type": "skiing, cross country, 4.0-4.9 mph, moderate speed and effort", "METs": 8.0, "equipment": ["skis"]})
            x = db.workouts.insert_one({"type": "skiing, cross country, 5.0-7.9 mph, brisk speed,", "METs": 9.0, "equipment": ["skis"]})
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

    username = body.get("username")
    password = body.get("password")
    firstName = body.get("firstName")
    gender = body.get("gender")
    weight = body.get("weight")
    height = body.get("height")
    age = body.get("age")
    lastName = body.get("lastName")

    if not username or not password or not firstName or not lastName or not gender or not weight or not height or not age:
        return {"status": 400, "message": "Missing field"}

    try:
        result = db.session.execute(
            "INSERT INTO people (username, password, firstName, gender, weight, height, age, lastName) VALUES (:username, :password, :firstName, :gender, :weight, :height, :age, :lastName)",
            {"username": username, "password": password, "firstName": firstName, "gender": gender, "weight": weight, "height": height, "age": age, "lastName": lastName},
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

    username = body.get("username")
    password = body.get("password")
    if not username or not password:
        return {"status": 400, "message": "Missing field"}

    result = db.session.execute(
        "SELECT id FROM people WHERE username=:username AND password=:password",
        {"username": username, "password": password},
    )
    person = result.fetchone()
    result.close()

    if person:
        return {"status": 200, "message": "Person found", "id": person[0]}
    return {"status": 404, "message": "Person not found - maybe incorrect username or password?"}

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
        duration = body.get("duration")
        if not type_workout or not METs:
            return {"status": 400, "message": "Missing field"}
        if not equipment:
            equipment = []

        inserted = client.test.workouts.insert_one({"type": type_workout,"METs": METs, "equipment": equipment, "duration": duration})
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
        workouts = client.test.workouts.find({"METs": {'$lte': 5.0}},{"type":1,"METs":1,"equipment":1}).limit(4)
        for workout in workouts:
            temp = workout
            temp["_id"] = str(workout["_id"])
            recommend_workouts.append(temp)
    elif BMI < 25:
        workouts = client.test.workouts.find({"METs": {'$gte': 8.0,'$lte': 15.0}},{"type":1,"METs":1,"equipment":1}).limit(4)
        for workout in workouts:
            temp = workout
            temp["_id"] = str(workout["_id"])
            recommend_workouts.append(temp)
    elif BMI < 30:
        workouts = client.test.workouts.find({"METs": {'$gte': 5.1,'$lte': 7.5}},{"type":1,"METs":1,"equipment":1}).limit(4)
        for workout in workouts:
            temp = workout
            temp["_id"] = str(workout["_id"])
            recommend_workouts.append(temp)
    else:
        workouts = client.test.workouts.find({"METs": {'$lte': 5.0}},{"type":1,"METs":1,"equipment":1}).limit(4)
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