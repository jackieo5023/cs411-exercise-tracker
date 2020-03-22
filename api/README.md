## First time set-up:
* Navigate to `/api`
* Run `pip install -U python-dotenv`
* Create a file named `.env` in your current directory (should be `/api`)
* Ask Jacqueline for what should go in this file
* Run `python3 -m venv venv`
* Run `. venv/bin/activate`
* Run `pip3 install -r requirements.txt` (may need to use `sudo`)
* Run `export FLASK_APP=src/__init__.py`

This sets up your environment file and virtual environment for dev.  To get out of the virtual environment, run `deactivate`.

## Every time you want to change and test the api:
* Navigate to `/api`
* Run `. venv/bin/activate`
* Run `pip3 install -r requirements.txt` (may need to use `sudo`)
* Run `export FLASK_APP=src/__init__.py`
* Run `flask run`

The api is now running on `localhost:5000`.
If you make a change to the api, Ctrl-C and re-run `flask run` to see the changes reflected.


### Built from these tutorials:
* https://realpython.com/flask-by-example-part-1-project-setup/
* https://hackersandslackers.com/flask-sqlalchemy-database-models/
