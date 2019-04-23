from flask import Flask, render_template, send_from_directory
from pathlib import Path
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'
    SECRET_KEY = 'dev'
    FLASK_ENV = 'development'


app = Flask(__name__, template_folder='../react-app/build', static_folder='../react-app/build/static')
app.config.from_object(Config)
CORS(app)

# db = SQLAlchemy(app)
#
#
# class User(db.Model):
#     pass
#     # db stuff
#
#
# class Order(db.Model):
#     pass
#     # order


# api
@app.route('/api/login', methods=['POST'])
def login():
    pass


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
