from . import db
import enum

# Useful for building models: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/

class Gender(enum.Enum):
    FEMALE = "Female"
    MALE = "Male"
    OTHER = "Other"

# eats = db.Table('eats',
#         db.Column('id', db.Integer, db.ForeignKey('people.id'), primary_key=True),
#         db.Column('recipeId', db.Integer, db.ForeignKey('Recipe.recipeId'), primary_key=True)
#     )

class Person(db.Model):
    """Model for user accounts"""
    # We will need to add more things to represent the relationships

    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.Enum(Gender), nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    # eats = db.relationship('Recipe', secondary=eats, lazy='subquery',
    #                        backref=db.backref('people', lazy=True))
    recipes = db.relationship("Recipe")

    def __init__(self, firstName, lastName, gender, weight, height, age):
        self.firstName = firstName
        self.lastName = lastName
        self.gender = gender
        self.weight = weight
        self.height = height
        self.age = age

    def __repr__(self):
        return "<Person {}>".format(self.id)

    # Recipe(recipeId: int, recipeName: string, protein: int,
    # vitamin: float[an array of volume of different kinds of vitamin], calories: float)

class CompletedWorkout(db.Model):
    """Model to link a user to a completed workout"""

    __tablename__ = 'CompletedWorkout'
    id = db.Column(db.Integer, primary_key=True)
    personId = db.Column(db.Integer, db.ForeignKey('people.id'))
    person = db.relationship('people')
    workoutId = db.Column(db.String(255), nullable=False)

    def __init__(self, personId, workoutId):
        self.personId = personId
        self.workoutId = workoutId

    def __repr__(self):
        return "<CompletedWorkout {}>".format(self.id)

class Recipe(db.Model):
    """Model for Recipes"""
    # more interaction with mongodb later

    __tablename__ = 'Recipe'
    recipeId = db.Column(db.Integer, primary_key=True)
    recipeName = db.Column(db.String(255), nullable=False)
    protein = db.Column(db.Integer, nullable=False)
    # vitamin = db.Column(db.ARRAY(db.Float), nullable=False) mysql does not support an array
    calories = db.Column(db.Integer, nullable = False)
    personId = db.Column(db.Integer, db.ForeignKey('people.id'))

    def __init__(self,name,protein,vitamin,calories):
        self.recipeName - name
        self.protein = protein
        # self.vitamin = vitamin
        self.calories = calories
        
    def __repr__(self):
        return "<Recipe {}>".format(self.recipeName)
