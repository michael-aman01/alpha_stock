from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_cors import CORS

api = Flask(__name__)
login = LoginManager(api)
login.init_app(api)
login.session_protection = "strong"
api.config.from_object(Config)
db = SQLAlchemy(api)
migrate = Migrate(api,db)
# cors = CORS(api)
csrf = CSRFProtect(api)

from api import models, routes