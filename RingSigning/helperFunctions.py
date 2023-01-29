import requests
from Ed25519Curve import Point, EC


def fromStringToPoint(string):
    x = int(string[2 : string.index(",")])
    y = int(string[string.index(",") + 2 : -2])
    return Point(x, y, EC)


def getPublicKeys(url):
    pubKeysResponse = requests.get(url)
    pubKeysData = pubKeysResponse.json()
    pubKeysPoints = pubKeysData["publicKeys"]
    publicKeys = [[fromStringToPoint(str(pubElement))] for pubElement in pubKeysPoints]
    return publicKeys
