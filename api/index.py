from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)

app = Flask(__name__)

class Restaurant(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  address = db.Column(db.String(100))
  website = db.Column(db.String(100))
  
  def __repr__(self):
    return '<Restaurant: %s>' % self.name

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
  return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

@app.route("/restaurants", methods=["GET"])
def get_all_restaurants():
  return {"status": "success", "message": "This will return all restaurants"}

# Posts a new restaurant, will need authentication and data validation.
@app.route("/restaurants", methods=["POST"])
def add_restaurant():
  data = request.get_json()
  return 201

@app.route("/restaurants/<int:id>", methods=["GET"])
def get_restaurant(id):
  return {"status": "success", "message": f"This will return a single restaurant with ID of {id}"}

@app.route("/restaurants/<int:id>", methods=["PATCH"])
def patch_restaurant(id):
  return {"status": "success", "message": f"This will edit a single restaurant with ID of {id}"}

@app.route("/restaurants/<ing:id>", methods=["DELETE"])
def delete_restaurant(id):
  return {"status": "success", "message": f"This will edit a single restaurant with ID of {id}"}

if __name__ == "__main__":
  app.run(debug=True)
