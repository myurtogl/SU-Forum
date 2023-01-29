from flask import Flask, request, jsonify
from flask_cors import CORS
from Ed25519Curve import EC, Point
from Clsag import sign, verify
from helperFunctions import getPublicKeys, fromStringToPoint

G = EC.G

CONTRACT_URL = "http://127.0.0.1:2000"


app = Flask(__name__)
CORS(app)


@app.route("/sign", methods=["POST"])
def signMessage():
    publicKeys = getPublicKeys(CONTRACT_URL + "/publicKeys")
    data = request.get_json()
    msg = data["msg"]
    pk = int(data["pk"].strip(), 16)
    signerPublicKey = pk * G
    try:
        idx = publicKeys.index([signerPublicKey])
    except:
        response = jsonify({"result": False})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    signature = sign(msg, [pk], G, publicKeys, idx)
    c_0 = str(signature[0])
    r = [str(num) for num in signature[1]]
    K_tilde = str(signature[2])
    response = jsonify(
        {
            "result": True,
            "msg": msg,
            "c_0": c_0,
            "r": r,
            "K_tilde": K_tilde,
        }
    )
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


# @app.route("/verify", methods=["POST"])
# def verifySigner():
#     publicKeys = getPublicKeys(CONTRACT_URL + "/publicKeys")
#     data = request.get_json()
#     msg = data["msg"]
#     c_0 = int(data["c_0"])
#     r = [int(num) for num in data["r"]]
#     K_tilde = fromStringToPoint(data["K_tilde"])
#     is_valid = verify(msg, c_0, r, [K_tilde], publicKeys)
#     response = jsonify({"result": is_valid})
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="5000")
