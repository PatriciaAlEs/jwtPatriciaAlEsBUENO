"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# INICIO DE SESION 

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg":"QUE NO LO ENCUENTRO, JOPETAS"}), 401
    print(user)
    print(user.password)
    if user.password != password:
        return jsonify({"msg":"NO ESTá BIEN ESE PASSWORD"}), 401

    # Si todo es correcto, crea el token de acceso
    access_token = create_access_token(identity=user.email)
    return jsonify(access_token=access_token)

# REGISTROOOO

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Falta rellenar algún campo o ambos"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    try:
        new_user = User(email=email, password=password, is_active=True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Usuario creado correctamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al crear el usuario", "error": str(e)}), 500




@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    print("Usuario actual:", current_user)  # Mensaje de depuración
    return jsonify(logged_in_as=current_user), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
