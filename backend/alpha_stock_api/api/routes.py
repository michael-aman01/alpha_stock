from api import api, db
from flask import request, jsonify, redirect, make_response, url_for
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
    print(req)
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
            data =  jsonify({"watchlist": user.watchlist, "id":current_user.id, "username":current_user.username, "email":current_user.email, "session_token":current_user.session_token})
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
         
            response =  jsonify({"watchlist": user.watchlist, "id":current_user.id, "username":current_user.username, "email":current_user.email, "session_token":current_user.session_token})
            
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
def get_session():

    if current_user.is_authenticated:
        token = generate_csrf()
        user =  jsonify({"watchlist": user.watchlist, "id":current_user.id, "username":current_user.username, "email":current_user.email, "session_token":current_user.session_token})
        res = make_response(user)
        res.headers["X-CSRFToken"] = token
        return  res
    else:
        return redirect(url_for('login'))
    
#user routes-------------------------------------------------

@api.route("/api/users/watchlist/<user_id>")
def get_watchlist(user_id):
    if current_user.is_authenticated:
        print(current_user.watchlist)
        return {"watchlist": current_user.watchlist}
    

@api.route("/api/users/watchlist/",methods=["POST"])
def add_to_watchlist():
    if current_user.is_authenticated:
        req = request.json
        user = User.query.filter_by(id=req["id"]).first()
        print(user.watchlist)
        # user.watchlist = []
        new_watchlist = [val for val in user.watchlist] + req["watchlist"]
        user.watchlist = new_watchlist
        db.session.add(user)
        db.session.commit()
        response =  jsonify({"watchlist": user.watchlist, "id":current_user.id, "username":current_user.username, "email":current_user.email, "session_token":current_user.session_token})
        return response

    else:
        print("login requre")
        return {}

