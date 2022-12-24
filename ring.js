const lrs = require("lrs");
const { privateKey } = require("lrs/output/Crypto.LRS");
const toPublic = require("ethereum-private-key-to-public-key");
const crypto = require("crypto");
const Crypto = require("ring-crypto").Crypto;

const ring = async () => {
  const ringSize = 20;
  const ring = [];
  for (let i = 0; i < ringSize - 1; i++) {
    const keyPair = await Crypto.Sign.keyPair();
    ring.push(keyPair.s_secret_key);
  }
  console.log(ring);
  //   const secretKeyPair = await Crypto.Sign.keyPair();
  //   ring.push(secretKeyPair.s_secret_key);

  //   const msg = Buffer.from("ring sign me!");
  //   const ringSig = await Crypto.Ring.sign(msg, secretKeyPair, ring);

  //   const valid = await Crypto.Ring.verify(msg, ring, ringSig);
  //   console.log(valid);
};

const hash = async () => {
  const msg = "Hash me!";
  const hash = (await Crypto.Hash.data(Buffer.from(msg))).hash;
  console.log(Buffer.from(hash).toString("hex"));
};

const generateKeyPair = async () => {
  const keyPair = await Crypto.Sign.keyPair();
  return keyPair;
};

const uint8ArrToHex = (uint8Arr) => {
  let hexString = "";
  for (let i = 0; i < uint8Arr.length; i++) {
    let hex = uint8Arr[i].toString(16);
    if (hex.length == 1) hex = "0" + hex;
    hexString += hex;
  }
  return hexString;
};

const hexToPublicKey = (hexString) => {
  let publicKey = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    publicKey[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }
  return publicKey;
};

// deneme = "a6102f95c68ace72b582e36d4ffd3884c9e953eecfbef07ebae41101452a14d2";
// // generateKeyPair();
// console.log(generateKeyPair());

const arr = new Uint8Array([
  69,
  174,
  225,
  113,
  252,
  165,
  186,
  36,
  105,
  117,
  189,
  111,
  205,
  63,
  241,
  230,
  208,
  0,
  176,
  17,
  154,
  137,
  4,
  177,
  186,
  218,
  133,
  235,
  216,
  78,
  165,
  192,
]);

// console.log(arr);

// const hex = uint8ArrToHex(arr);
// console.log(hex);
// const uint8 = hexToPublicKey(hex);
// console.log(uint8 == arr);
// const hex2 = uint8ArrToHex(uint8);
// console.log(hex2 == hex);

const secp256k1 = require("secp256k1");
function privateKeyToPublicKey(privateKey) {
  // Check that the input is a hexadecimal string
  if (!/^[0-9a-fA-F]+$/.test(privateKey)) {
    throw new Error("Invalid input: private key must be a hexadecimal string");
  }

  // Convert the private key to a Buffer
  const privateKeyBuffer = Buffer.from(privateKey, "hex");

  // Use the secp256k1 elliptic curve to generate the corresponding public key
  const publicKeyBuffer = secp256k1.publicKeyCreate(privateKeyBuffer, false);

  // Convert the public key Buffer to a Uint8Array
  const publicKeyUint8Array = new Uint8Array(publicKeyBuffer);

  return publicKeyUint8Array;
}

const private =
  "afa0e6859f6d8bd4a1711c48ee3a7652a7a185b3d9a11ff6cda274650be55a01";
// const pubKeyObject = crypto.createPublicKey({
//   key: private,
//   format: "pem",
// });

// const publicKey = pubKeyObject.export({
//   format: "pem",
//   type: "spki",
// });

// publicKey = privateKeyToPublicKey(private);

// // -----BEGIN PUBLIC KEY-----...
// console.log(publicKey);
// console.log(uint8ArrToHex(publicKey));

const k =
  "5732e8eb98d1f28afc5d084c84cc59e6f980487f1167672cce83d21e8d771efd42daf5c3666e1a6a1f84e5a12cdedb8ba833619fbfc566f95714009c9824b688e5d4c22297eb02adbf30d5c66c1fb1b927eefed728aceceec0e6e6b128b6bb5b";
const n =
  "5eeb2da3b8d991fc209679e1309cdb0c3bee862b2f474a0d38406223aef4c3a58ded433812b45c3e5650d2d95ca0265a61f96c59f3a8804aa3c3a8b72b1de08323714b038a5c18da4af50d2770eb4d28c7ad897280866935672c87ecbaca845b";

// console.log(k.length);
// console.log(n.length);
// generateKeyPair();

let priv = new Uint8Array([
  171,
  144,
  139,
  98,
  48,
  80,
  62,
  137,
  139,
  155,
  54,
  147,
  70,
  180,
  206,
  130,
  13,
  33,
  69,
  69,
  104,
  11,
  225,
  234,
  2,
  13,
  89,
  225,
  205,
  188,
  212,
  9,
]);

const pub = new Uint8Array([
  109,
  248,
  231,
  240,
  90,
  189,
  96,
  56,
  155,
  222,
  213,
  195,
  227,
  10,
  27,
  174,
  119,
  108,
  133,
  129,
  186,
  119,
  209,
  252,
  241,
  93,
  145,
  180,
  228,
  39,
  31,
  158,
]);

function privateKeyToPublicKey(privateKey) {
  // Check that the private key is a Uint8Array
  if (!(privateKey instanceof Uint8Array)) {
    throw new Error("Private key must be a Uint8Array");
  }

  // Import the necessary libraries
  const { ec } = require("elliptic");
  const crypto = require("crypto");

  // Create a new instance of the elliptic curve
  const curve = new ec("secp256k1");

  // Generate the corresponding public key
  const keyPair = curve.keyFromPrivate(privateKey);
  const publicKey = keyPair.getPublic();

  // Return the public key as a Uint8Array
  return Uint8Array.from(Buffer.from(publicKey.encode(true)));
}

const foo = async () => {
  const key = await generateKeyPair();
  const priv = key.s_secret_key.s_secret_data;
  console.log(key.s_public_key.s_public_data);
  console.log(privateKeyToPublicKey(priv));
};

foo();
