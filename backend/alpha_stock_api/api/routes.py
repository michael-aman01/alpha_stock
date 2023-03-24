from api import api, db
from flask import request, jsonify, redirect
from api.models import User
from flask_login import current_user, login_user, logout_user, login_required


@api.route("/api/users",methods=["GET"])
def index():
    return "please login"


@api.route("/api/users/register",methods=["POST"])
def register():
    req = request.json
    check = User.query.filter_by(email=req["email"], username=req["username"]).all()
    if len(check) > 0:
        return "USER ALREADY EXISTS"
    else:
        user = User(email=req["email"], username=req["username"], password=req["password"])
        if user.check_email(user.password):
            user.create_hash(user.password)
            user.ensure_session_token()
            db.session.add(user)
            db.session.commit()
            data = {"id": user.id, "session_token": user.session_token, "email": user.email}
            return jsonify(data)


@api.route("/api/users/login",methods=["POST"])
def login():
    if current_user.is_authenticated:
        return "ALREADY LOGGED IN"
    else:
        req = request.json
        user =User.query.filter_by(email=req["email"], username=req["username"]).first()
        if user and user.is_password(req["password"]):
            login_user(user, remember=True)
            return "LOGIN SUCCESSFUL"
        else:
            return "INVALID LOGIN"
        
@api.route("/api/users/logout")
def logout():
    if current_user.is_authenticated:
        logout_user()
        return "USER LOGGED OUT"
    else:
        return "NO USER LOGGED IN"
    

@api.route("/api/users/profile")

@login_required
def profile():
    return "user profile"
