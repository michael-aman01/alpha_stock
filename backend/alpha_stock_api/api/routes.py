from api import api
from flask import request

@api.route("/",methods=["GET"])
def index():
    return "hello"


@api.route("/register",methods=["POST"])
def register():
    print(request.json.keys())
    return "foods"

