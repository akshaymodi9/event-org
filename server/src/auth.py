import functools
import json
from flask import (
    Blueprint,
    flash,
    g,
    redirect,
    render_template,
    request,
    session,
    url_for,
    jsonify,
)
from werkzeug.security import check_password_hash, generate_password_hash

from flask import current_app as app
from .models import user
from .db import db


bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    existing_user = user.query.filter_by(email=email).first()

    if existing_user:
        if check_password_hash(existing_user.password, password):
            return jsonify(
                {
                    "msg": "Login Success",
                    "user_id": existing_user.id,
                    "user_name": existing_user.user_name,
                }
            )
        else:
            return jsonify({"msg": "Login credentials invalid"})
    else:
        return jsonify({"msg": "Login credentials invalid"})


@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    user_name = data["user_name"]
    password = generate_password_hash(data["password"], method="sha256")
    email = data["email"]
    mobile_no = data["mobile_no"]

    existing_user = user.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"msg": "User already present"})

    new_user = user(
        user_name=user_name, password=password, email=email, mobile_no=mobile_no
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User Created"})


@bp.route("/getUsers", methods=["GET"])
def get_all_user():
    all_users = []
    users = user.query.all()
    for result in users:
        user1 = result.as_dict()
        all_users.append(user1)

    return jsonify(all_users)

@bp.route('/searchUser/<username>',methods=["GET"])
def search_user(username):
    all_users = []
    name = "%"+username+"%"
    users = user.query.filter(user.user_name.ilike(name))
    for result in users:
        user1 = result.as_dict()
        all_users.append(user1)

    return jsonify(all_users)
