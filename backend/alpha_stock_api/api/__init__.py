from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

api = Flask(__name__)
api.config.from_object(Config)

db = SQLAlchemy(api)
migrate = Migrate(api,db)

from api import routes, models