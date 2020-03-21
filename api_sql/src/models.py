from . import db
import enum

# Useful for building models: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/

class Gender(enum.Enum):
    FEMALE = "female"
    MALE = "male"
    OTHER = "other"

class Person(db.Model):
    """Model for user accounts"""
    # We will need to add more things to represent the relationships

    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)
    publicId = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.Enum(Gender), nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __init__(self, publicId, name, gender, weight, height, age):
        self.publicId = publicId
        self.name = name
        self.gender = gender
        self.weight = weight
        self.height = height
        self.age = age

    def __repr__(self):
        return "<Person {}>".format(self.publicId)