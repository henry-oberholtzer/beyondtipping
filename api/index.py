from flask import Flask, request, redirect, url_for, request, abort
from flask_cors import CORS
from flask_admin import Admin
from flask_admin import helpers as admin_helpers
from flask_admin.contrib.sqla import ModelView
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
from sqlalchemy.exc import IntegrityError
from flask_security import Security, SQLAlchemyUserDatastore, auth_required, hash_password, current_user
from flask_security.models import fsqla_v3 as fsqla
from sqlalchemy import or_
import os

# Creates the Flask Application
app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config.from_pyfile('config.py')
# Generate the key using secrets.token_urlsafe() in REPL
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", '-0akJP5907ZPDh1q0zgRKDePXLaDiRwObKDRdlAIHrI')
app.config['SECURITY_PASSWORD_SALT'] = os.environ.get('SECURITY_PASSWORD_SALT', '72679148524296801418994703305798390574')

# Creates a session with cookies.
app.config["REMEMBER_COOKIE_SAMESITE"] = "strict"
app.config["SESSION_COOKIE_SAMESITE"] = "strict"

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance/test.db')

app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
  "pool_pre_ping": True,
}

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)
api = Api(app)

# Define user models
fsqla.FsModels.set_db_info(db)

class Role(db.Model, fsqla.FsRoleMixin):
  pass
class User(db.Model, fsqla.FsUserMixin):
  pass

# Setup for Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
app.security = Security(app, user_datastore)

# Define database models

class Type(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  amount = db.Column(db.String(50))
  restaurants = db.relationship('Restaurant', backref='type', lazy=True)

  def __repr__(self):
    return f'{self.name}: {self.amount}'

class Restaurant(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  address = db.Column(db.String(100))
  website = db.Column(db.String(100))
  imageUrl = db.Column(db.String(200))
  latitude = db.Column(db.Float())
  longitude = db.Column(db.Float())
  visible = db.Column(db.Boolean(), default=False)
  type_id = db.Column(db.Integer, db.ForeignKey('type.id'), nullable=False)

  def __repr__(self):
    return '<Restaurant: %s>' % self.name

ma = Marshmallow(app)

class RestaurantSchema(ma.Schema):
  class Meta:
    fields = ("id", "name", "address", "website", "imageUrl", "latitude", "longitude", "visible", "type_id")
    model = Restaurant
    
class TypeSchema(ma.Schema):
  class Meta:
    fields = ("id", "name", "amount")
    model = Type
  
restaurant_schema = RestaurantSchema()
restaurants_schema = RestaurantSchema(many=True)
type_schema = TypeSchema()
types_schema = TypeSchema(many=True)

# Note: i seeded the type table in the db in the python shell (like when sqlite was first set up)
def seed_db():
    types = [
    { "name": 'Flat Fee', 
      "amount": '',
    },
    {
      "name": 'Service Fee',
      "amount": '0.18',
    },
    {
      "name": 'Service Fee',
      "amount": '0.20',
    },
    {
      "name": 'Service Fee',
      "amount": '0.22',
    },
    {
      "name": 'Service Fee',
      "amount": 'other',
    }
  ]
    for type_data in types:
      new_type = Type(name=type_data["name"], amount=type_data["amount"])
      db.session.add(new_type)
    db.session.commit()

def seed_rest_db():
  restaurants = [
     {
        "name": "Bernstein's Bagels",
        "address": "816 N Russell St, Portland, OR 97227",
        "website": "https://bernsteinsbagels.com/",
        "imageUrl": "https://static1.squarespace.com/static/58715578e6f2e1d4215c94fb/t/62278b3792539d0c2c8cacab/1646758711651/LOGO.jpg?format=1500w",
        "latitude": 45.54178453985534,
        "longitude": -122.67473068332497,
        "visible":  True,
        "type_id": 1,
    },
    {
        "name": "Gracie's Apizza",
        "address": "7304 N Leavitt Ave, Portland, OR 97203",
        "website": "https://www.graciesapizza.com/",
        "imageUrl": "https://images.squarespace-cdn.com/content/v1/5a790307b7411c447f906450/0c65fe57-4201-4a29-9f93-a89252bf9760/Gracie%27s+Apizza+Round+12+inch+%28no+white%29.png",
        "latitude": 45.589974368346105,
        "longitude": -122.75392355397106,
        "visible":  True,
        "type_id": 1,
    },
    {
        "name": "Mirisata",
        "address": "2420 SE Belmont St, Portland, OR 97214",
        "website": "https://mirisata.com/",
        "imageUrl": "https://mirisata.com/cdn/shop/files/Mirisata_Header_300x300.png?v=1613789790",
        "latitude": 45.51691301771276,
        "longitude": -122.640913069314,
        "visible":  True,
        "type_id": 1,
    },
    {
        "name": "Kachka",
        "address": "960 SE 11th Ave, Portland, OR 97214",
        "website": "https://www.kachkapdx.com/menus",
        "imageUrl": "https://images.squarespace-cdn.com/content/v1/6425fda37cd955140101b1b9/ada3a486-8c67-486c-bb5f-cabc02282403/Kachka_0342.jpg",
        "latitude": 45.51637079485203,
        "longitude": -122.65459971534298,
        "visible":  True,
        "type_id": 4,
    },
    {
        "name": "Scottie's Pizza Parlor NW",
        "address": "685 NW 21st Ave, Portland, OR 97209",
        "website": "https://www.scottiespizzaparlor.com/",
        "imageUrl": "https://static.wixstatic.com/media/e4f34f_a76b3cc99f7745d59f07304c15575626~mv2.png/v1/fill/w_2500,h_1818,al_c/e4f34f_a76b3cc99f7745d59f07304c15575626~mv2.png",
        "latitude": 45.52829802597582,
        "longitude": -122.69451466931405,
        "visible":  True,
        "type_id": 3,
    },
    {
        "name": "Scottie's Pizza Parlor SE",
        "address": "2128 SE Division St, Portland, OR 97202",
        "website": "https://www.scottiespizzaparlor.com/",
        "imageUrl": "https://static.wixstatic.com/media/e4f34f_a76b3cc99f7745d59f07304c15575626~mv2.png/v1/fill/w_2500,h_1818,al_c/e4f34f_a76b3cc99f7745d59f07304c15575626~mv2.png",
        "latitude": 45.50519758833178,
        "longitude": -122.64288511642539,
        "visible":  True,
        "type_id": 3,
    },
    {
        "name": "Masala Lab PDX",
        "address": "5237 NE Martin Luther King Jr Blvd, Portland, OR 97211",
        "website": "https://masalalabpdx.com/",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSfbkTXPh6hXT4XVMGQF1UjE5MBukuiZJN-o8QCXZBw&s",
        "latitude": 45.56198197080319,
        "longitude": -122.6619204,
        "visible":  True,
        "type_id": 1,
    },
    {
        "name": "Astera",
        "address": "1407 SE Belmont St, Portland, OR 97214",
        "website": "https://www.asterapdx.com/",
        "imageUrl": "https://images.squarespace-cdn.com/content/v1/6553de6b1f32c47e5b7fbc02/34029aa4-2087-4c3b-880c-71a2a32ebaf9/IMG_7877.JPG",
        "latitude": 45.517281442933665,
        "longitude": -122.65144143068598,
        "visible":  True,
        "type_id": 1,
    },
    {
        "name": "Gigi's Cafe",
        "address": "6320 SW Capitol Hwy, Portland, OR 97239",
        "website": "https://gigiscafepdx.com/",
        "imageUrl": "https://gigiscafepdx.com/wp-content/uploads/2019/03/block-img-landscape1.jpg",
        "latitude": 45.478770425239595,
        "longitude": -122.69428179259911,
        "visible":  True,
        "type_id": 1,
    },
    {
        "name": "El Gaucho",
        "address": "319 SW Broadway, Portland, OR 97205",
        "website": "https://elgaucho.com/portland/",
        "imageUrl": "https://elgaucho.com/wp-content/uploads/el-gaucho-portland.jpg",
        "latitude": 45.522208697575685,
        "longitude": -122.678663284657,
        "visible":  True,
        "type_id": 3,
    },
    {
        "name": "Ava Gene's",
        "address": "3377 SE Division St, Portland, OR 972025",
        "website": "https://www.avagenes.com/",
        "imageUrl": "https://s3.amazonaws.com/arc-wordpress-client-uploads/wweek/wp-content/uploads/2017/10/30141957/RG17_AvaGenes_HenryCromett02.jpg",
        "latitude": 45.50539680925617,
        "longitude": -122.62954903862807,
        "visible":  True,
        "type_id": 3,
    },
     {
        "name": "Cafe Olli",
        "address": "3925 NE Martin Luther King Jr Blvd, Portland, OR 97212",
        "website": "https://cafeolli.com/",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9fwubBUSuwdnyRTkX5yYZcndkdnZos-yVjc9dluG6ZA&s",
        "latitude": 45.5516389366529,
        "longitude": -122.66165400794208,
        "visible":  True,
        "type_id": 3,
    },
  ]
  for data in restaurants:
    new_restaurant = Restaurant(
      name=data["name"],
      address=data["address"],
      website=data["website"],
      imageUrl=data["imageUrl"],
      latitude=data["latitude"],
      longitude=data["longitude"],
      type_id=data["type_id"],
    )
    db.session.add(new_restaurant)
  db.session.commit()

with app.app_context():
  db.create_all()
  if not app.security.datastore.find_user(email="test@email.com"):
    app.security.datastore.create_user(email="test@email.com", password=hash_password("password"))

class RestaurantListResource(Resource):
  def get(self):
    print("get method called")
    try:
      query = request.args.get('query')
      print(f"query param name: {query}")

      if query:
        restaurants = Restaurant.query.filter(or_(Restaurant.name.ilike(f"%{query}%")),
        (Restaurant.address.ilike(f"%{query}%"))).all()
      else:
        restaurants = Restaurant.query.all()
      
      return restaurants_schema.dump(restaurants)
    except Exception as e:
      app.logger.error(f"An error: {str(e)}")
      return {"message": "Error occurred"}, 500

  # @auth_required('token', 'session')
  def post(self):
    try:
      new_restaurant = Restaurant(
        name=request.json['name'],
        address=request.json['address'],
        website=request.json['website'],
        imageUrl=request.json['imageUrl'],
        latitude=request.json['latitude'],
        longitude=request.json['longitude'],
        type_id=request.json['type_id'],
      )
      db.session.add(new_restaurant)
      db.session.commit()
      return restaurant_schema.dump(new_restaurant)
    except IntegrityError:
      return {"message": "Invalid type_id"}, 400

api.add_resource(RestaurantListResource, '/restaurants')
    
class RestaurantResource(Resource):
  def get(self, id):
    restaurant = Restaurant.query.get_or_404(id)
    return restaurant_schema.dump(restaurant)
  def patch(self, id):
    restaurant = Restaurant.query.get_or_404(id)

    if 'name' in request.json:
      restaurant.name = request.json['name']
    if 'address' in request.json:
      restaurant.address = request.json['address']
    if 'website' in request.json:
      restaurant.website = request.json['website']
    if 'imageUrl' in request.json:
      restaurant.imageUrl = request.json['imageUrl']
    if 'latitude' in request.json:
      restaurant.latitude = request.json['latitude']
    if 'longitude' in request.json:
      restaurant.longitude = request.json['longitude']
    if 'type_id' in request.json:
      restaurant.type_id = request.json['type_id']

    db.session.commit()
    return restaurant_schema.dump(restaurant)

  @auth_required('token', 'session')
  def delete(self, id):
    restaurant = Restaurant.query.get_or_404(id)
    db.session.delete(restaurant)
    db.session.commit()
    return '', 204

api.add_resource(RestaurantResource, '/restaurants/<int:id>')


class TypeListResource(Resource):
  def get(self):
    try:
      types = Type.query.all()
      return types_schema.dump(types)
    except Exception as e:
      app.logger.error(f"An error: {str(e)}")
      return {"message": "Error occurred"}, 500
  def post(self):
    try:
      new_type = Type(
        name=request.json['name'],
        amount=request.json['amount']
      )
      db.session.add(new_type)
      db.session.commit()
      return type_schema.dump(new_type)
    except IntegrityError:
      return {"message": "Invalid type_id"}, 400

api.add_resource(TypeListResource, '/types')

class TypeResource(Resource):
  def get(self, id):
    type = Type.query.get_or_404(id)
    return type_schema.dump(type)
  def patch(self, id):
    type = Type.query.get_or_404(id)

    if 'name' in request.json:
      type.name = request.json['name']
    if 'amount' in request.json:
      type.amount = request.json['amount']

    db.session.commit()
    return type_schema.dump(type)

  @auth_required('token', 'session')
  def delete(self, id):
    type = Type.query.get_or_404(id)
    db.session.delete(type)
    db.session.commit()
    return '', 204

class TypeResource(Resource):
  def get(self, id):
    type = Type.query.get_or_404(id)
    return type_schema.dump(type)
  def patch(self, id):
    type = Type.query.get_or_404(id)

    if 'name' in request.json:
      type.name = request.json['name']
    if 'amount' in request.json:
      type.amount = request.json['amount']

    db.session.commit()
    return type_schema.dump(type)

  @auth_required('token', 'session')
  def delete(self, id):
    type = Type.query.get_or_404(id)
    db.session.delete(type)
    db.session.commit()
    return '', 204

api.add_resource(TypeResource, '/types/<int:id>')

# Admin Views

class CustomModelView(ModelView):
  def is_accessible(self):
    return (
      current_user.is_active and
      current_user.is_authenticated
    )
  
  def _handle_view(self, name, **kwargs):
    """
    Overrides builtin _handle_view in order to redirect users when a view is not accessible.
    """
    if not self.is_accessible():
      if current_user.is_authenticated:
        # Permission denied
        abort(403)
      else:
        # Redirect to login
        return redirect(url_for('security.login', next=request.url))

app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

admin = Admin(app,
              name='beyondtipping',
              base_template='custom_master.html',
              template_mode='bootstrap3',)
admin.add_view(CustomModelView(Restaurant, db.session))
admin.add_view(CustomModelView(Type, db.session))

admin.add_view(CustomModelView(Role, db.session))
admin.add_view(CustomModelView(User, db.session))

@app.security.context_processor
def security_context_processor():
  return dict(
    admin_base_template=admin.base_template,
    admin_view=admin.index_view,
    h=admin_helpers,
    get_url=url_for
  )

if __name__ == "__main__":
  app.run(debug=True)
