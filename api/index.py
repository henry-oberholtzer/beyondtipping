from flask import Flask, request, redirect, url_for, request, abort
from flask_admin import Admin
from flask_admin import helpers as admin_helpers
from flask_admin.contrib.sqla import ModelView
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.exc import IntegrityError
from flask_security import Security, SQLAlchemyUserDatastore, auth_required, hash_password, current_user
from flask_security.models import fsqla_v3 as fsqla
import os

# Creates the Flask Application
app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
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

class Restaurant(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  address = db.Column(db.String(100))
  website = db.Column(db.String(100))
  imageUrl = db.Column(db.String(100))
  latitude = db.Column(db.Float())
  longitude = db.Column(db.Float())
  type_id = db.Column(db.Integer, db.ForeignKey('type.id'), nullable=False)

  def __repr__(self):
    return '<Restaurant: %s>' % self.name

ma = Marshmallow(app)

class RestaurantSchema(ma.Schema):
  class Meta:
    fields = ("id", "name", "address", "website", "imageUrl", "latitude", "longitude", "type_id")
    model = Restaurant
    
class TypeSchema(ma.Schema):
  class Meta:
    fields = ("id", "name", "amount")
    # not sure users need access to the 1:m relationship???
    model = Type
  
restaurant_schema = RestaurantSchema()
restaurants_schema = RestaurantSchema(many=True)
type_schema = TypeSchema()
types_schema = TypeSchema(many=True)

# Note: i seeded the type table in the db in the shell like when sqlite was first set up
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

with app.app_context():
  db.create_all()
  if not app.security.datastore.find_user(email="test@email.com"):
    app.security.datastore.create_user(email="test@email.com", password=hash_password("password"))

class RestaurantListResource(Resource):
  def get(self):
    try:
      restaurants = Restaurant.query.all()
      return restaurants_schema.dump(restaurants)
    except Exception as e:
      app.logger.error(f"An error: {str(e)}")
      return {"message": "Error occurred"}, 500

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
    
# LEFT OFF HERE> NEED TO ADD GET BY ID< PUT< DELETE
class RestaurantResource(Resource):
  def get(self, id):
    restaurant = Restaurant.query.get_or_404(id)
    return restaurant_schema.dump(restaurant)

api.add_resource(RestaurantListResource, '/restaurants')

class TypeListResource(Resource):
  def get(self):
    try:
      types = Type.query.all()
      return types_schema.dump(types)
    except Exception as e:
      app.logger.error(f"An error: {str(e)}")
      return {"message": "Error occurred"}, 500

api.add_resource(TypeListResource, '/types')

# Admin Views

class CustomModelView(ModelView):
  def is_accessible(self):
    return (
      current_user.is_active and
      current_user.is_authenticated and
      current_user.has_role('superuser')
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
    return super()._handle_view(name, **kwargs)

app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

admin = Admin(app,
              name='beyondtipping',
              base_template='custom_master.html',
              template_mode='bootstrap3',)
admin.add_view(CustomModelView(Restaurant, db.session))
admin.add_view(CustomModelView(Type, db.session))

admin.add_view(CustomModelView(Role, db.session))
admin.add_view(CustomModelView(Role, db.session))

@security.context_processor
def security_context_processor():
  return dict(
    admin_base_template=admin.base_template,
    admin_view=admin.index_view,
    h=admin_helpers,
    get_url=url_for
  )

if __name__ == "__main__":
  app.run(debug=True)
