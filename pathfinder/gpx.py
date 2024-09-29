import xml.etree.ElementTree as ET


def createGpx(pathCoords):
    gpx = ET.Element("gpx")

    metadata = ET.SubElement(gpx, "metadata")
    name = ET.SubElement(metadata, "name")
    name.text = "GPX Export"
    desc = ET.SubElement(metadata, "description")
    desc.text = "GPX Description"

    for coord in pathCoords:
        wpt = ET.SubElement(gpx, "wpt")
        wpt.set('lat', f"{coord[0]}")
        wpt.set('lon', f"{coord[1]}")

    b_xml = ET.tostring(gpx)

    with open("sample.gpx", "wb") as file:
        file.write(b_xml)
