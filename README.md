
# SU-Forum
A university forum implementation on Ethereum blockchain

### Table of contents

* [Introduction](#introduction)
* [Motivation](#motivation)
* [Flow Diagram](#flow-diagram)
* [Project Setup](#project-setup)
* [Future Work](#future-work)
* [Screenshots](#screenshots)


### Introduction
This is a term project for our Blockchain course in Sabanci University. Project offers a forum that consists "verifiable but anonymous users". What that means is the system can make sure that all the users are a member of a community (in this context, that community is Sabanci University) but at the same time protects their anonimity. And all of these are decentralised since it is built on top of Ethereum blockchain. Anonimity aspect is possible by the implementation of a mechanism called Ring Signatures, a mechanism that is in use by some Cryptocurrencies such as Moreno.

### Motivation
Anonymity on the internet is an important concept for various reasons such as identity protection, the need for privacy in sensitive issues, freedom of expression, etc. But at the same time, it can create a problem with bot accounts, especially on social
media. As an example, we are living in a time the perception of individuals by society is mostly shaped by the discussions on social media. It can be seen what is the problem here. One can create and control hundreds, thousands, and millions of accounts for a purpose and manipulate any discussion, which is happening in big social media platforms like Twitter. Therefore, we need mechanisms for obtaining ‘anonymous but verifiable’
platforms. Our team believes that this can be possible with ‘Decentralized identities’, also
referred to as DIDs, with the support of blockchain technologies. This situation is also
applicable to smaller communities such as university forums.

### Flow Diagram
![Flow Diagram](./diagram.jpeg)

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
I want to continue to work on this project although the course is over. Because I feel like it can offer more features. First thing comes to my mind is some functionalities such as commenting, upvoting posts etc. On top of that I have an intention to deploy this project into Sabanci University ecosystem and offer it for public use. Only time will show us the results for that and I will be uploading here as the project progresses...

### Screenshots





