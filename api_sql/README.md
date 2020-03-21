Built from these tutorials:
* https://realpython.com/flask-by-example-part-1-project-setup/
* https://hackersandslackers.com/flask-sqlalchemy-database-models/

First time set-up:
* Navigate to `/api_sql`
* Run `pip install -U python-dotenv`
* Create a file named `.env` in your current directory (should be `/api_sql`)
* Ask Jacqueline for what should go in this file
* Run `python3 -m venv venv`
* Run `. venv/bin/activate`
* Run `pip3 install -r requirements.txt` (may need to use `sudo`)
* Run `export FLASK_APP=src/__init__.py`

This sets up your environment file and virtual environment for dev.  To get out of the virtual environment, run `deactivate`.

To run the app, run `flask run --host localhost --port 5000`.