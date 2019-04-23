import os

from flask import Flask
from flask import render_template
from flask import send_from_directory
from flask import request
from pathlib import Path
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy


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


class User(db.Model):
    username = db.Column(db.String(50), primary_key=True, unique=True, nullable=False)
    password = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username
    # db stuff


# class Order(db.Model):
#     pass
#     # order


# # api
# @app.route('/api/login', methods=['POST'])
# def login():
#     pass


# Catch all
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):

    file_path = './flaskbank/react-app/build'  # change here

    if path and Path(file_path+'/'+path).exists():
        print('sent: ', path)
        return send_from_directory('/react/build', path)
    print(f'Caught /{path}')
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
