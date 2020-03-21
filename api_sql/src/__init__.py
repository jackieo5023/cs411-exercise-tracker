from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

app = Flask(__name__, instance_relative_config=False)
app.wsgi_app = ProxyFix(app.wsgi_app)
app.config.from_object('config.Config')

@app.route("/api/sql")
def index():
    return "Hello, world!"

# def create_app():
#     """Construct the core application."""
#     app = Flask(__name__, instance_relative_config=False)
#     app.config.from_object('config.Config')
#     # db.init_app(app)

#     with app.app_context():
#         from . import routes

#         # Create tables for our models
#         # db.create_all()

#         return app