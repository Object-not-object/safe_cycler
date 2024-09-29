import json


def generateData():
    with open("dane_XD.json", encoding='utf-8') as file:
        rawData = json.load(file)

    elements = rawData['elements']
    ways = [element for element in elements if element['type'] == 'way']
    nodes = {element['id']: {"id": element['id'], "lat": element['lat'], "lon": element['lon']}
             for element in elements if element['type'] == 'node'}
    orderedNodes = [{"id": element['id'], "lat": element['lat'], "lon": element['lon']}
                    for element in elements if element['type'] == 'node']
    orderedNodes.sort(key=lambda node: node['id'])

    newWays = []
    for way in ways:
        newWay = {}
        newWay['id'] = way['id']
        newWay['nodes'] = [nodes.get(nodeId) for nodeId in way['nodes']]
        newWay['tags'] = {}

        newWay['tags']['name'] = way['tags']['name'] if "name" in way['tags'] else "unknown"
        newWay['tags']['lanes'] = way['tags']['lanes'] if "lanes" in way['tags'] else 1
        newWay['tags']['bicycle'] = way['tags']['bicycle'] if "bicycle" in way['tags'] else "no"
        newWay['tags']['maxspeed'] = way['tags']['maxspeed'] if "maxspeed" in way['tags'] else 0
        newWay['tags']['surface'] = way['tags']['surface'] if "surface" in way['tags'] else "unknown"

        newWays.append(newWay)

    with open('data.json', 'w', encoding='utf-8') as file:
        json.dump(newWays, file, ensure_ascii=False)

    with open('nodes.json', 'w', encoding='utf-8') as file:
        json.dump(orderedNodes, file, ensure_ascii=False)
