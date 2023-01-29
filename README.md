
# SU-Forum
A university forum implementation on Ethereum blockchain

### Table of contents

* [Introduction](#introduction)
* [Motivation](#motivation)
* [Functionality](#functionality)
* [Project Setup](#project-setup)
* [Future Work](#future-work)
* [Screenshots](#screenshots)


### Introduction


### Motivation
Motivation section

### Functionality

### Project Setup
I'll provide the steps for setting up the project in your local machine.
1. Open Ganache and start press Quickstart
2. Install the required packages for ContractOwner project by using following commands:

For Windows:
```
$ cd ContractOwner
$ python -m venv myenv
$ .\myenv\Scripts\activate
$ pip install -r .\requirements.txt
$ python app.py
```

For MacOS:
```
$ cd ContractOwner
$ python3 -m venv myenv
$ source .\myenv\bin\activate
$ pip3 install -r .\requirements.txt
$ python3 app.py
```
3. Start the flask server by typing `python app.py {deployer-address} {deployer-private-key}` (python3 for MacOS). You can get the address and private key from Ganache.
4. Install the required packages for RingSigning project. You can use the same commands as step 2. Then, start the project in local port by typing `python app/py` (python3 for MacOS).
5. Install the required packages for ClientSide project and start it on local port by using following commands:
```
$ cd ClientSide
$ npm install
$ npm start
```
If you come across with a problem here, it may be related with your node version. Adding `--openssl-legacy-provider` to "scripts/start" part on package.json can solve this issue.

6. Go to http://localhost:3000 and you can see the forum page.

### Future Work
future work

### Screenshots
screenshots




