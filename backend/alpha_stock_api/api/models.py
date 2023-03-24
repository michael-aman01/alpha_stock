from api import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    

    def __repr__(self):
        return f'''{{id: {self.id} ,username: {self.username}, email: {self.email}, password_hash: {self.password_hash}}}'''