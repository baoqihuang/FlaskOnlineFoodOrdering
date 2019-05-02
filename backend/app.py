import os
from flask import Flask, jsonify, render_template, request, send_from_directory, redirect
from flask_jwt_extended import create_access_token, JWTManager, get_jwt_identity, get_raw_jwt, jwt_required
from flask_bcrypt import Bcrypt
from pathlib import Path
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime,timedelta
f_jwt = JWTManager()


jti_blacklist = set()


@f_jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in jti_blacklist


class Config:
    project_dir = os.path.dirname(os.path.abspath(__file__))
    database_file = "sqlite:///{}".format(os.path.join(project_dir, "usersinfo.db"))
    SQLALCHEMY_DATABASE_URI = database_file
    SECRET_KEY = 'dev'
    FLASK_ENV = 'development'


app = Flask(__name__, template_folder='../react-app/build', static_folder='../react-app/build/static')
app.config.from_object(Config)
CORS(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
f_jwt.init_app(app)


class Itemsinorder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer)
    item_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self, order_id=None, item_id=None, quantity=None):
        self.order_id = order_id
        self.item_id = item_id
        self.quantity = quantity

    def __repr__(self):
        return '<Order %r>' % self.id

    def to_dict(self):
        result = {"order_id": self.order_id, "item_id": self.item_id, "quantity": self.quantity}
        return result


class Shoppingcart(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self, user_id=None, item_id=None, quantity=None):
        self.user_id = user_id
        self.item_id = item_id
        self.quantity = quantity

    def __repr__(self):
        return '<Shoppingcart %r>' % self.user_id


    def to_dict(self):
        result = {"order_id": self.order_id, "item_id": self.item_id, "quantity": self.quantity}
        return result


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first = db.Column(db.String(50), unique=False, nullable=False)
    last = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), unique=False, nullable=False)
    user_type = db.Column(db.String(50), unique=False, nullable=False)
    phonenumber = db.Column(db.String(15), unique=False, nullable=True)
    orders = db.relationship('Order', backref='user', lazy=True)

    def __init__(self, first=None, last=None, email=None, username=None, password=None, user_type=None, phonenumber=None):
        self.first = first
        self.last = last
        self.email = email
        self.username = username
        self.password = password
        self.user_type = user_type
        self.phonenumber = phonenumber

    def __repr__(self):
        return '<User %r>' % self.username

    def to_dict(self):
        result = {"first": self.first, "last": self.last, "email": self.email, "username": self.username, "user_type": self.user_type, "phonenumber": self.phonenumber}
        return result


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Float, unique=False, nullable=False)
    time = db.Column(db.DateTime, unique=False, nullable=False)
    ifcancelable = db.Column(db.Boolean, nullable=False)
    ifpickup = db.Column(db.Boolean, nullable=False)
    status = db.Column(db.String(20), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, total=None, time=None, ifcancelable=None, ifpickup=None, status=None, user_id=None):
        self.total = total
        self.time = time
        self.ifcancelable = ifcancelable
        self.ifpickup = ifpickup
        self.status = status
        self.user_id = user_id

    def __repr__(self):
        return '<Order %r>' % self.id

    def to_dict(self):
        result = {"id": self.id, "total": self.total, "time": self.time, "ifcancelable": self.ifcancelable, "ifpickup": self.ifpickup, "status": self.status, "user_id": self.user_id}
        return result


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    price = db.Column(db.Float)
    description = db.Column(db.String(1000), unique=False, nullable=False)
    ingredient = db.Column(db.String(1000), unique=False, nullable=False)
    cal = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    picurl = db.Column(db.String(100), unique=True, nullable=False)
    category = db.Column(db.String(15), unique=False, nullable=False)

    def __init__(self, name=None, price=None, description=None, ingredient=None, cal=None, rating=None, picurl=None, category=None):
        self.name = name
        self.price = price
        self.description = description
        self.ingredient = ingredient
        self.cal = cal
        self.rating = rating
        self.picurl = picurl
        self.category = category

    def __repr__(self):
        return '<Item %r>' % self.id

    def to_dict(self):
        result = {"id": self.id, "name": self.name, "price": self.price, "description": self.description, "ingredient": self.ingredient, "cal": self.cal, "rating": self.rating, "picurl": self.picurl, "category": self.category}
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


def detectorderstatus():
    orders = Order.query.all()
    for order in orders:
        timefornow = datetime.now()
        minusfourtime = timefornow - timedelta(minutes=4)
        if order.time < minusfourtime:
            order.ifcancelable = False
            db.session.commit()
        minusfivetime = timefornow - timedelta(minutes=5)
        if order.time < minusfivetime and order.status != "completed":
            order.status = "prepared"
            db.session.commit()


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

    token = create_access_token(identity={'username': username})
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
        phonenumber = data.get('phonenumber', '')
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    user = User.query.filter_by(username=username).filter_by(email=email).first()
    if user is None:
        pw_hash = bcrypt.generate_password_hash(password.encode('UTF-8'))
        newuser = User(first, last, email, username, pw_hash, user_type, phonenumber)
        db.session.add(newuser)
        db.session.commit()
        return jsonify({'msg': 'User register success'}), 200
    else:
        return jsonify({'msg': 'User already existed'}), 400


@app.route('/userinfo', methods=['GET'])
@jwt_required
def get_all_userinfo():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'client not found'}), 409

    return jsonify(client.to_dict()), 200


@app.route('/deleteuser', methods=['GET'])
@jwt_required
def delete_user():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'client not found'}), 409
    else:
        db.session.delete(client)
        db.session.commit()
    return jsonify({'msg': 'user deleted successfully'}), 200


# display all the items'id,name,price,picture before login
@app.route('/display', methods=['GET'])
# @jwt_required
def display_all():
    items = Item.query.all()
    if not items:
        return jsonify({'msg': 'No item in the databse'}), 409

    result = []
    for item in items:
        result.append({"id": item.id, "name": item.name, "price": item.price, "picture": item.picurl, "category": item.category})
    return jsonify(result), 200

# display the specific item'id,name,price,picture before login
@app.route('/display/detail', methods=['POST'])
# @jwt_required
def display_detail():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        item_id = data["item_id"]
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    item = Item.query.filter_by(id=item_id).first()
    if item is None:
        return jsonify({'msg': 'Item is not existed'}), 400
    else:
        return jsonify(item.to_dict()), 200


@app.route('/setupitems', methods=['POST'])
# @jwt_required
def set_up_items():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400
    name = data["name"].lower()
    price = data["price"]
    description = data["description"].lower()
    ingredient = data["ingredient"].lower()
    cal = data['cal']
    rating = data["rating"]
    picurl = data["picurl"].lower()
    category = data['category'].lower()

    item = Item.query.filter_by(name=name).first()
    if item is None:
        item = Item(name, price, description, ingredient, cal, rating, picurl, category)
        db.session.add(item)
        db.session.commit()
        return jsonify({"msg": "Successfully add item"}), 200
    else:
        return jsonify({'msg': 'Item already existed'}), 400


@app.route('/auth/userorderhistory', methods=['GET'])
@jwt_required
def get_all_orderhistory():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'client not found'}), 409
    detectorderstatus()
    orders = Order.query.filter_by(user_id=client.id).all()
    if not orders:
        return jsonify({'msg': "This client's order does not found"}), 409
    userorders = []
    for order in orders:
        userorders.insert(0, {'id': order.id, 'status': order.status, 'time': order.time, 'total': order.total})
    return jsonify(userorders), 200


@app.route('/auth/orderdetail', methods=['POST'])
@jwt_required
def display_order_detail():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'client not found'}), 409

    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        order_id = data["order_id"]
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400
    detectorderstatus()
    order = Order.query.filter_by(id=order_id).first()

    itemsid = Itemsinorder.query.filter_by(order_id=order_id).all()
    if not itemsid:
        return jsonify({'msg': "This order does not have items"}), 409

    orderitems = []
    for itemid in itemsid:
        item = Item.query.filter_by(id=itemid.item_id).first()
        orderitems.append({'name': item.name, 'price': item.price, 'quantity': itemid.quantity,
                           'picurl': item.picurl})

    return jsonify({"order_status": order.status, "ifcancellable": order.ifcancelable, "orderdetail": orderitems}), 200


@app.route('/auth/cancelorder', methods=['POST'])
@jwt_required
def order_cancel():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'client not found'}), 409

    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        order_id = data["order_id"]
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    detectorderstatus()
    order = Order.query.filter_by(id=order_id).first()
    if not order or order.ifcancelable:
        return jsonify({'msg': "This order does not exist or can not be cancelled"}), 409
    else:
        db.session.delete(order)
        db.session.commit()
        itemsid = Itemsinorder.query.filter_by(order_id=order_id).all()
        for itemid in itemsid:
            db.session.delete(itemid)
            db.session.commit()

    return jsonify({'msg': "This order was cancelled successfully"}), 200


@app.route('/auth/manager', methods=['GET'])
@jwt_required
def manager_display():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client or client.user_type != 'manager':
        return jsonify({'msg': 'Invalid client or client not found'}), 409

    pickuporders = []
    detectorderstatus()

    orders = Order.query.filter_by(ifpickup=False, status="prepared").all()
    if not orders:
        return jsonify({'msg': "This is no order need to be pick up"}), 409
    else:
        for order in orders:
            itemsid = Itemsinorder.query.filter_by(order_id=order.id).all()
            detail = ""
            for itemid in itemsid:
                item = Item.query.filter_by(id=itemid.item_id).first()
                detail += item.name + " * " + str(itemid.quantity) + " "
            pickuporders.append({"order_id": order.id, "detail": detail, "order_time": order.time, "status": order.status})
    return jsonify(pickuporders), 200


@app.route('/auth/managerpickup', methods=['POST'])
@jwt_required
def manager_pickup():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client or client.user_type != 'manager':
        return jsonify({'msg': 'Invalid client or client not found'}), 409

    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        order_id = data["order_id"]
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400
    detectorderstatus()

    order = Order.query.filter_by(id=order_id, ifpickup=False, status="prepared").first()
    if not order:
        return jsonify({'msg': "This order can not be picked up"}), 409
    else:
        order.ifcancelable = False
        order.ifpickup = True
        order.status = "completed"
        db.session.commit()
    return jsonify({'msg': "Order pick up successfully"}), 200


@app.route('/auth/shoppingcart', methods=['GET'])
@jwt_required
def user_shoppingcart():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'Invalid client or client not found'}), 409

    itemsid = Shoppingcart.query.filter_by(user_id=client.id).all()
    if not itemsid:
        return jsonify({'msg': "Nothing in the shopping cart"}), 409
    itemsinfo = []
    for itemid in itemsid:
        item = Item.query.filter_by(id=itemid.item_id).first()
        itemsinfo.append({"item_id": item.id, "picurl": item.picurl, "name": item.name, "description": item.description, "price": item.price})
    return jsonify(itemsinfo), 200


@app.route('/auth/shoppingcarttotal', methods=['GET'])
@jwt_required
def user_shoppingcarttotal():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'Invalid client or client not found'}), 409

    itemsid = Shoppingcart.query.filter_by(user_id=client.id).all()
    if not itemsid:
        return jsonify({'msg': "This is no order need to be pick up"}), 409
    total = 0
    for itemid in itemsid:
        item = Item.query.filter_by(id=itemid.item_id).first()
        total += item.price * itemid.quantity
    return jsonify({"total": total}), 200


@app.route('/auth/shoppingcart/additem', methods=['POST'])
@jwt_required
def shoppingcart_additem():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'Invalid client or client not found'}), 409

    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        item_id = data["item_id"]
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    item = Shoppingcart.query.filter_by(user_id=client.id, item_id=item_id).first()

    if not item:
        newiteminshippingcart = Shoppingcart(client.id, item_id, 1)
        db.session.add(newiteminshippingcart)
    else:
        item.quantity += 1

    db.session.commit()

    return jsonify({'msg': 'Item add to the shoopingcart successfully'}), 200


@app.route('/auth/shoppingcart/deleteitem', methods=['POST'])
@jwt_required
def shoppingcart_deleteitem():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'Invalid client or client not found'}), 409

    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        item_id = data["item_id"]
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    item = Shoppingcart.query.filter_by(user_id=client.id, item_id=item_id).first()

    if not item:
        return jsonify({'msg': 'Item does not existed in the shoppingcart'}), 400
    else:
        if item.quantity <= 1:
            db.session.delete(item)
        else:
            item.quantity -= 1
        db.session.commit()
    return jsonify({'msg': 'Item was deleted from the shoopingcart successfully'}), 200


@app.route('/auth/shoppingcart/placeorder', methods=['POST'])
@jwt_required
def shoppingcart_placeorder():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'Invalid client or client not found'}), 409

    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        phonenumber = data["phone_number"]
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400
    client.phonenumber = phonenumber
    db.session.commit()

    itemsid = Shoppingcart.query.filter_by(user_id=client.id).all()
    if not itemsid:
        return jsonify({'msg': "This is no order need to be pick up"}), 409
    total = 0
    for itemid in itemsid:
        item = Item.query.filter_by(id=itemid.item_id).first()
        total += item.price * itemid.quantity
    # set timer to 10
    ordertime = datetime.now()
    neworder = Order(total, ordertime, True, False, "inprogress", client.id)
    db.session.add(neworder)
    db.session.commit()
    for itemid in itemsid:
        iteminorder = Itemsinorder(neworder.id, itemid.item_id, itemid.quantity)
        db.session.add(iteminorder)
        db.session.commit()

    for itemid in itemsid:
        db.session.delete(itemid)
        db.session.commit()
    return jsonify({'msg': 'Order checkout successfully'}), 200


@app.route('/auth/deleteorder', methods=['POST'])
@jwt_required
def delete_order():
    current_user = get_jwt_identity()['username']
    client = User.query.filter_by(username=current_user).first()
    if not client:
        return jsonify({'msg': 'client not found'}), 409

    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        order_id = data["order_id"]
    except KeyError:
        return jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400
    detectorderstatus()
    order = Order.query.filter_by(id=order_id).first()

    if not order:
        return jsonify({'msg': "This order does not existed"}), 409
    else:
        db.session.delete(order)
        db.session.commit()

    itemsid = Itemsinorder.query.filter_by(order_id=order_id).all()
    if not itemsid:
        return jsonify({'msg': "This order does not have items"}), 409
    else:
        for itemid in itemsid:
            db.session.delete(itemid)
            db.session.commit()
    return jsonify({"msg": "Successfully deleted order"}), 200


if __name__ == '__main__':
    app.run(debug=True)
