from dotenv import load_dotenv
load_dotenv()

import os


class Config:
    """Set Flask configuration vars from .env file."""

    # General
    TESTING = os.getenv('TESTING')
    FLASK_DEBUG = os.getenv('FLASK_DEBUG')
    SECRET_KEY = os.getenv('SECRET_KEY')

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')