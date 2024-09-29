import json
from math import sqrt


def getClosestNode(lat, lon):
    with open("nodes.json", "r") as file:
        nodes = json.load(file)

    foundNode = nodes[0]
    distance = sqrt((nodes[0]['lat'] - lat)**2 + (nodes[0]['lon'] - lon)**2)

    for node in nodes[1:]:
        newDist = sqrt((node['lat'] - lat)**2 + (node['lon'] - lon)**2)
        if newDist < distance:
            foundNode = node
            distance = newDist

    return foundNode
