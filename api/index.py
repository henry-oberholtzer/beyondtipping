from flask import Flask, request

app = Flask(__name__)

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

@app.router("/restaurants/<int:id>", methods=["GET"])
def get_restaurant(id):
  return {"status": "success", "message": f"This will return a single restaurant with ID of {id}"}

@app.router("/restaurants/<int:id>", methods=["PATCH"])
def patch_restaurant(id):
  return {"status": "success", "message": f"This will edit a single restaurant with ID of {id}"}

@app.router("/restaurants/<ing:id>", methods=["DELETE"])
def delete_restaurant(id):
  return {"status": "success", "message": f"This will edit a single restaurant with ID of {id}"}

if __name__ == "__main__":
  app.run()
