from flask import current_app as app, request
from .models import db

@app.route("/api")
def index():
    return "Hello, world!"