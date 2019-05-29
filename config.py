"""
Configuration values for flask
"""
from pathlib import Path
import os


class Config:
    DEBUG = False
    TESTING = False
    TEMPLATE_PATH = Path('../react-app/build')
    STATIC_PATH = Path('../react-app/build/static')
    project_dir = os.path.dirname(os.path.abspath(__file__))
    database_file = "sqlite:///{}".format(os.path.join(project_dir, "usersinfo.db"))
    SQLALCHEMY_DATABASE_URI = database_file
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']


class DevelopmentConfig(Config):
    DEBUG = True
    SECRET_KEY = 'dev'


class ProductionConfig(Config):
    __secret = 'fUjXn2r5u8x/A?D(G+KaPdSgVkYp3s6v'
    SECRET_KEY = os.environ.get('SECRET_KEY', __secret)
    SQLALCHEMY_DATABASE_URI = os.environ.get('MONGO_URI', Config.SQLALCHEMY_DATABASE_URI)


class TestConfig(Config):
    TESTING = True
    SECRET_KEY = 'test'

