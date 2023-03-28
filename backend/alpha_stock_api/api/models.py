from api import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func
from flask_login import UserMixin
from api import login


class User(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(128),  nullable=True)
    password_hash = db.Column(db.String(128),  nullable=False, unique=True)
    session_token = db.Column(db.String(128),index=True, unique=True, nullable=False)
    watchlist = db.Column(db.JSON, nullable=False,default=[])
    # created = db.Column(db.DateTime, default=func.now())
    def check_email(self,password):
        if len(password) < 6:
            return False
        else:
            return True
        
    def ensure_session_token(self):
            self.session_token = uuid4()

            return self.session_token
        
    def is_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def create_hash(self, password):
        self.password_hash = generate_password_hash(password)
  
        return self.password_hash
    

    @login.user_loader
    def load_user(id):
         return User.query.get(int(id))
         
    


    

    def __repr__(self):
        return f'''{{id: {self.id} ,username: {self.username}, email: {self.email}, password_hash: {self.password_hash}}}'''