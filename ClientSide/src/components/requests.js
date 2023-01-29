// import axios from 'axios'
const axios = require('axios')

const BASE_URL = 'http://127.0.0.1:5000'

let response = null
const setResponse = (res) => {
  response = res
}

const getSignature = async (addr, pk, idx) => {
  const privateKey = BigInt('0x' + pk)
  await axios
    .post(`${BASE_URL}/sign`, {
      msg: addr,
      pk: pk,
      idx: idx,
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

const getVerification = (msg, c_0, r, K_tilde) => {
  axios
    .post(`${BASE_URL}/verify`, {
      msg: msg,
      c_0: c_0,
      r: r,
      K_tilde: K_tilde,
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

// getSignature(
//   'selam',
//   '0027ba1cc197678fa3b69865535e6023152bad7f82fd012cc20a86d4948e7a4e',
//   2,
// )

const request = {
  K_tilde:
    '[(55426341485918476906170035992944148906219761582507165538201410116487957527718, 20586083010784988057457386197792358001942361811237330056018592710920317210240)]',
  c_0:
    '4842384702496556302515187062466450023218645563105811222284652109016829861986',
  msg: 'selam',
  r: [
    '5148724026768610701799265676884737182332073160329502523277962976317487468373',
    '3803540293713155252320460933568732555970802853665299402495218706543748860674',
    '136097904434831696336672199276016954337763696944433523741885610195953560550',
    '7133227941731140806391197775520788136492488882143328714444094129798549068209',
    '5895088749754118334120528653984716427587879177996198146824245794198832162055',
  ],
}

getVerification(request.msg, request.c_0, request.r, request.K_tilde)
