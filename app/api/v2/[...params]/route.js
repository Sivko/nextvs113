import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
const path = require("path");

export async function POST(req) {
  const axios = require('axios');
  const rubles = require('rubles').rubles;

  const serilizeUrl = req.url.split('/')

  const token = serilizeUrl[serilizeUrl.length - 1]
  const scriptId = serilizeUrl[serilizeUrl.length - 2]

  const options = {
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer ' + token,
      'S2-Allow-Websockets': true

      // 'Accept': '*'
    }
  }

  // newData.type = "deals";
  // let text = rubles(data.data.custom_101206);
  // if (text) { newData.attributes.customs.custom_103046 = text.charAt(0).toUpperCase() + text.slice(1) } 
  // else { newData.attributes.customs.custom_103046 = 0 } return newData

  const tmp = await req.json()
  const data = tmp.data;
  let newData = { "type": "companies", "id": data.id, "attributes": { "customs": {}} };
  let constants = await axios.get('https://app.salesap.ru/api/v1/constants', options).catch((err) => NextResponse.json(err));
  let constant = constants.data.data;
  let webScript = constant.find(obj => obj.id == scriptId).attributes.value

  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  let compute = new AsyncFunction('data', 'newData', 'rubles', 'options', 'axios', webScript);
  let computeResult = compute(data, newData, rubles, options, axios)
  // const resEnd = await axios.patch('https://app.salesap.ru/api/v1/' + computeResult.type + '/' + data.id, JSON.stringify({ "data": computeResult }), options).catch((err) => NextResponse.json(err))
  return NextResponse.json({ success: computeResult })
}

export async function GET(req) {
  const serilizeUrl = req.url.split('/')
  console.log(serilizeUrl[serilizeUrl.length - 1])
  console.log(serilizeUrl[serilizeUrl.length - 2])
  const axios = require('axios');
  const rubles = require('rubles').rubles;
  return NextResponse.json({ success: "Это Get запрос, а для выполнения скрипта нужен POST :)" })
}