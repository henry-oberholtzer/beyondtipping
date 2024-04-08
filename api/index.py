from flask import Flask, request
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance/test.db')
db = SQLAlchemy(app)
api = Api(app)

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


if __name__ == "__main__":
  app.run(debug=True)