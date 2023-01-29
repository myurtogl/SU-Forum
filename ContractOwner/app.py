from flask import Flask, request, jsonify
from flask_cors import CORS
from web3 import Web3
from deployment import deployContract
from Clsag import verify, fromStringToPoint
import json
import sys


app = Flask(__name__)
CORS(app)

w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
deployerAddress = sys.argv[1]
deployerPk = sys.argv[2]
contractAddress, abi, chain_id = deployContract(deployerAddress, deployerPk)
gasPrice = w3.eth.gas_price
contract = w3.eth.contract(address=contractAddress, abi=abi)


def fetchPubKeys():
    pubKeysFile = open("publicKeys.json")
    data = json.load(pubKeysFile)
    publicPool = data["pubKeys"]
    pubKeysFile.close()
    return publicPool


@app.route("/register", methods=["POST"])
def register():
    publicPool = fetchPubKeys()
    data = request.get_json()
    msg = data["msg"]
    c_0 = int(data["c_0"])
    r = [int(num) for num in data["r"]]
    K_tilde = fromStringToPoint(data["K_tilde"])
    publicKeys = [[fromStringToPoint(str(pubElement))] for pubElement in publicPool]
    is_valid = verify(msg, c_0, r, [K_tilde], publicKeys)
    if is_valid:
        nonce = w3.eth.getTransactionCount(deployerAddress)
        store_contact = contract.functions.setMembership(msg, True).buildTransaction(
            {
                "chainId": chain_id,
                "from": deployerAddress,
                "gasPrice": w3.eth.gas_price,
                "nonce": nonce,
            }
        )
        signedTransaction = w3.eth.account.sign_transaction(
            store_contact, private_key=deployerPk
        )
        transactionSent = w3.eth.send_raw_transaction(signedTransaction.rawTransaction)
        w3.eth.wait_for_transaction_receipt(transactionSent)

    isMember = contract.functions.verifyMembership(msg).call()
    response = jsonify({"result": isMember})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/contractAddress", methods=["GET"])
def getConractAddress():
    response = jsonify({"addr": contractAddress})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/publicKeys", methods=["GET"])
def getPublicKeys():
    publicPool = fetchPubKeys()
    response = jsonify({"publicKeys": publicPool})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="2000")
