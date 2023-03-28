from api import api, db
from flask import request, jsonify, redirect, make_response
from api.models import User
from flask_login import current_user, login_user, logout_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf
#user routes:
#-----------------------------
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
            login_user(user)
            return jsonify(data)



@api.route("/api/users/profile")
@login_required
def profile():
    return "user profile"



#session routes
#----------------------------------


@api.route("/api/session/login",methods=["POST"])
def login():
        req = request.json
        print("here")
        user =User.query.filter_by(email=req["email"]).first()
        print(req)
        if user and user.is_password(req["password"]):
            login_user(user)
         
            response = jsonify({"id":current_user.id, "username":current_user.username, "email":current_user.email, "session_token":current_user.session_token})
            
            return response
        else:
            return {"error":"INVALID LOGIN"}
        
@api.route("/api/session/logout")
@login_required
def logout():
    if current_user.is_authenticated:
        logout_user()
        return {}
    else:
        return {"error":"no user logged in"}
    

@api.route("/api/csrf")
def get_csrf():

    token = generate_csrf()
    res = make_response({"details": "token set"})
    res.headers["X-CSRFToken"] = token
    return res
    

@api.route("/api/session/get_current",methods=["GET"])
@login_required
def get_session():

    if current_user.is_authenticated:
        token = generate_csrf()
        user = jsonify({"id":current_user.id, "username":current_user.username, "email":current_user.email, "session_token":current_user.session_token})
        res = make_response(user)
        res.headers["X-CSRFToken"] = token
        return  res
    else:
        return {}, 404