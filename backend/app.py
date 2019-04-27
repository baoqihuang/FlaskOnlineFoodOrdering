import os
from flask import Flask, jsonify, render_template, request, send_from_directory, redirect
from flask_jwt_extended import create_access_token, JWTManager, get_jwt_identity, get_raw_jwt, jwt_required
from flask_bcrypt import Bcrypt
from pathlib import Path
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy
f_jwt = JWTManager()


jti_blacklist = set()


@f_jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in jti_blacklist


class Config:
    project_dir = os.path.dirname(os.path.abspath(__file__))
    database_file = "sqlite:///{}".format(os.path.join(project_dir, "cs157b.db"))
    SQLALCHEMY_DATABASE_URI = database_file
    SECRET_KEY = 'dev'
    FLASK_ENV = 'development'


app = Flask(__name__, template_folder='../react-app/build', static_folder='../react-app/build/static')
app.config.from_object(Config)
CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
f_jwt.init_app(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first = db.Column(db.String(50), unique=False, nullable=False)
    last = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), unique=True, nullable=False)
    user_type = db.Column(db.String(50), unique=False, nullable=False)

    def __init__(self, first=None, last=None, email=None, username=None, password=None, user_type=None):
        self.first = first
        self.last = last
        self.email = email
        self.username = username
        self.password = password
        self.user_type = user_type

    def __repr__(self):
        return '<User %r>' % self.username

    def to_dict(self):
        result = {"first": self.first, "last": self.last, "email": self.email, "username": self.username}
        return result

# Catch all
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):

    file_path = './react-app/build'  # change here

    if path and Path(file_path+'/'+path).exists():
        print('sent: ', path)
        return send_from_directory('./react-app/build', path)
    print(f'Caught /{path}')
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        username = data['username']
        password = data['password']
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    client = User.query.filter_by(username=username).first()

    if not client:
        return jsonify({'msg': 'Invalid username/password'}), 409

    valid = bcrypt.check_password_hash(client.password.decode('UTF-8'), password)
    if not valid:
        return jsonify({'msg': 'Invalid username/password'}), 409

    token = create_access_token(identity={'username': username, 'user_type': client.user_type})
    return jsonify({'access_token': token}), 201


@app.route('/reset', methods=['POST'])
def reset_password():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400
    try:
        username = data['username']
        email = data['email']
        newpw = data['password']
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    client = User.query.filter_by(username=username, email=email).first()

    if not client:
        return jsonify({'msg': 'invalid information'})

    new_hash = bcrypt.generate_password_hash(newpw.encode('UTF-8'))
    client.password = new_hash
    db.session.commit()

    return jsonify({'msg': 'password changed successful'}), 200


@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    jti_blacklist.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200


@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        first = data["first_name"].lower()
        last = data["last_name"].lower()
        email = data["email"].lower()
        username = data["username"].lower()
        password = data['password']
        user_type = data.get('user_type', 'client')
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    user = User.query.filter_by(username=username, email=email).first()
    if user is None:
        pw_hash = bcrypt.generate_password_hash(password.encode('UTF-8'))
        newuser = User(first, last, email, username, pw_hash, user_type)
        db.session.add(newuser)
        db.session.commit()
        return redirect("/")
    else:
        return jsonify({'msg': 'User already existed'}), 400


@app.route('/userinfo', methods=['GET'])
@jwt_required
def get_all_detail():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'client not found'}), 409

    return jsonify(client.to_dict()), 200


if __name__ == '__main__':
    app.run(debug=True)
