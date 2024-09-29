from flask import Flask, request
from flask_cors import CORS

from clean import generateData
from nodeFinder import getClosestNode
import astar

app = Flask(__name__)

CORS(app, origins='*', methods=["GET"], resources={
     r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})


@app.route("/api", methods=["GET"])
def pathFinder():
    data = request.get_json()
    generateData()
    start, end = getClosestNode(data['startLat'], data['startLon']), getClosestNode(
        data['endLat'], data['endLon'])
    if start['id'] == end['id']:
        return "Start and end points too close to each other", 400

    return astar.main(start['id'], end['id']), 200


if __name__ == "__main__":
    app.run(debug=True)
