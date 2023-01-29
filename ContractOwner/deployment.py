import solcx
import json
from web3 import Web3


def deployContract(deployerAddress, deployerPk):
    with open("./UniversityForum.sol", "r") as file:
        Single_contract_file = file.read()

    solcx.install_solc("0.8.0")
    compiled_sol = solcx.compile_standard(
        {
            "language": "Solidity",
            "sources": {"UniversityForum.sol": {"content": Single_contract_file}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.8.0",
    )

    with open("compiled_solCode.json", "w") as file:
        json.dump(compiled_sol, file)

    Bytecode = compiled_sol["contracts"]["UniversityForum.sol"]["UniversityForum"][
        "evm"
    ]["bytecode"]["object"]
    abi = compiled_sol["contracts"]["UniversityForum.sol"]["UniversityForum"]["abi"]

    w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))

    chain_id = 1337
    my_address = Web3.toChecksumAddress(deployerAddress.lower())
    private_key = deployerPk
    UniversityForumContract = w3.eth.contract(abi=abi, bytecode=Bytecode)
    nonce = w3.eth.getTransactionCount(my_address)

    # build transaction
    transaction = UniversityForumContract.constructor().buildTransaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "nonce": nonce,
        }
    )
    # Sign the transaction
    sign_transaction = w3.eth.account.sign_transaction(
        transaction, private_key=private_key
    )
    print("Deploying Contract!")
    # Send the transaction
    transaction_hash = w3.eth.send_raw_transaction(sign_transaction.rawTransaction)
    # Wait for the transaction to be mined, and get the transaction receipt
    print("Waiting for transaction to finish...")
    transaction_receipt = w3.eth.wait_for_transaction_receipt(transaction_hash)
    print(f"Done! Contract deployed to {transaction_receipt.contractAddress}")

    return transaction_receipt.contractAddress, abi, chain_id
