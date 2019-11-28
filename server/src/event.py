import functools

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
from werkzeug.exceptions import abort

from flask import current_app as app
from .models import events, shared_events, user
from .db import db
from sqlalchemy import text


bp = Blueprint("event", __name__)


@bp.route("/<id>", methods=["GET"])
def get_events(id):
    all_events = []
    # event = events.query.filter_by(owber_id = owner_id
    q3 = "select * from events where owner_id=:param union select * from events where id IN (select event_id from shared_events where user_id=:param)";
    # print(q3)
    ans = db.session.execute(text(q3),{"param":id})
    d, a = {}, []
    for rowproxy in ans:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)

    return jsonify(a)


@bp.route("/event", methods=["POST"])
def add_event():
    # print("request data",request.get_json())
    data = events(request.get_json())
    db.session.add(data)
    db.session.commit()
    return jsonify({"msg": "Event Created"})


@bp.route("/event/<id>", methods=["PUT"])
def update_event(id):
    data = request.get_json()
    db.session.query(events).filter_by(id=id).update(data)
    db.session.commit()
    return jsonify({"msg": "Event Updated Successfully"})


@bp.route("/event/<id>", methods=["Delete"])
def delete_event(id):
    db.session.query(events).filter_by(id=id).delete(synchronize_session=False)
    db.session.commit()
    return jsonify({"msg": "Event Deleted"})


@bp.route("/shareevent", methods=["POST"])
def share_event():
    data = request.get_json()
    for i in data['user_id']:
        data = shared_events(request.get_json(),i)
        db.session.add(data)
        db.session.commit()
        
    return jsonify({"msg": "Event Shared with the user(s)"})


@bp.route("/getSharedEvent/<owner_id>", methods=["GET"])
def get_shared_events(owner_id):
    all_events = []
    # event = events.query.filter_by(owber_id = owner_id
    q3 = "select * from shared_events,user where shared_events.user_id = user.id and shared_events.owner_id =:param";
    # print(q3)
    ans = db.session.execute(text(q3),{"param":owner_id})
    d, a = {}, []
    for rowproxy in ans:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)

    return jsonify(a)


@bp.route("/revokeSharedEvent/<event_id>/<user_id>", methods=["Delete"])
def revokeSharedEvent(event_id,user_id):
    db.session.query(shared_events).filter_by(event_id=event_id,user_id=user_id).delete(synchronize_session=False)
    db.session.commit()
    return jsonify({"msg": "Revoked shared event"})

   

