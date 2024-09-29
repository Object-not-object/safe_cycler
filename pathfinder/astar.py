import json
from math import sqrt
from heuri import heuri
from gpx import createGpx


class Node():
    def __init__(self, parent=None, id=None, coords=None):
        self.parent = parent
        self.id = id
        self.coords = coords

        self.g = 0
        self.h = 0
        self.f = 0

    def __eq__(self, other):
        return self.id == other.id


def astar(graph, startId, startCoords, endId, endCoords, nodes):
    if startId not in graph.keys() or endId not in graph.keys():
        return

    startNode = Node(None, startId, startCoords)
    startNode.g = startNode.h = startNode.f = 0
    endNode = Node(None, endId, endCoords)
    endNode.g = endNode.h = endNode.f = 0

    openList = []
    closedList = []
    openList.append(startNode)

    while len(openList) > 0:
        currentNode = openList[0]
        currentIndex = 0
        for index, node in enumerate(openList):
            if node.f < currentNode.f:
                currentNode = node
                currentIndex = index

        openList.pop(currentIndex)
        closedList.append(currentNode)

        if currentNode == endNode:
            path = []
            current = currentNode
            while current is not None:
                path.append(current.id)
                current = current.parent
            return path[::-1]

        children = [Node(currentNode, neighbor[0], nodes[neighbor[0]])
                    for neighbor in graph[currentNode.id]]

        for child in children:
            if len([closedChild for closedChild in closedList if closedChild == child]) >= 1:
                continue

            for neighbor in graph[currentNode.id]:
                if neighbor[0] == child.id:
                    child.g = currentNode.g + neighbor[1]
            child.h = sqrt((endNode.coords[0] - currentNode.coords[0])
                           ** 2 + (endNode.coords[1] - currentNode.coords[1])**2)
            child.f = child.g + child.h

            if len([openNode for openNode in openList if openNode == child and openNode.g < child.g]):
                continue

            openList.append(child)


def main(startId=12026767495, endId=30372083):
    with open("data.json") as file:
        ways = json.load(file)

    graph = {}
    nodes = {}

    for way in ways:
        for node in way['nodes']:
            nodes[node['id']] = (node['lat'], node['lon'])
        for node1, node2 in zip(way['nodes'][:-1], way['nodes'][1:]):
            distBetweenNodes = sqrt(
                (node2['lat']-node1['lat'])**2 + (node2['lon'] - node1['lon'])**2)
            weight = heuri(
                way["tags"]["maxspeed"],
                way["tags"]["bicycle"],
                way["tags"]["surface"],
                way["tags"]["lanes"]
            )

            distBetweenNodes *= weight

            if node1['id'] in graph.keys():
                graph[node1['id']].append((node2['id'], distBetweenNodes))
            else:
                graph[node1['id']] = [(node2['id'], distBetweenNodes)]

            if node2['id'] in graph.keys():
                graph[node2['id']].append((node1['id'], distBetweenNodes))
            else:
                graph[node2['id']] = [(node1['id'], distBetweenNodes)]

    path = astar(graph, startId,
                 nodes[startId], endId, nodes[endId], nodes)
    pathCoords = [nodes[node] for node in path]
    print(pathCoords)
    createGpx(pathCoords)
    with open('path_coords.json', 'w') as f:
        json.dump(pathCoords, f)

    return pathCoords


if __name__ == '__main__':
    main()
