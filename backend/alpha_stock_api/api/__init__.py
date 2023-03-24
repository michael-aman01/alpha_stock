from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager


api = Flask(__name__)
login = LoginManager(api)
api.config.from_object(Config)
db = SQLAlchemy(api)
migrate = Migrate(api,db)

from api import models, routes