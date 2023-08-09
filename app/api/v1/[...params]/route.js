import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
const path = require("path");

export async function POST(req) {
  const axios = require('axios');
  const rubles = require('rubles').rubles;

  const serilizeUrl = req.url.split('/')

  const token = serilizeUrl[serilizeUrl.length-1]
  const scriptId = serilizeUrl[serilizeUrl.length-2]

  const options = {
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer ' + token,
      // 'Accept': '*'
    }
  }
  const data = req.body.data
  let newData = { "type": "companies", "id": data.id, "attributes": { "customs": {}, "allow-websockets": true } };
  let constants = await axios.get('https://app.salesap.ru/api/v1/constants', options).catch((err) => res.json(err));
  let constant = constants.data.data;
  let webScript = constant.find(obj => obj.id == scriptId).attributes.value

  let compute = new Function('data', 'newData', 'rubles', webScript);
  const resEnd = await axios.patch('https://app.salesap.ru/api/v1/' + compute(data, newData, rubles).type + '/' + data.id, JSON.stringify({ "data": compute(data, newData, rubles) }), options).catch((err) => res.json(err))

  return NextResponse.json({ success: resEnd })
}

export async function GET(req) {
  const serilizeUrl = req.url.split('/')
  console.log(serilizeUrl[serilizeUrl.length-1])
  console.log(serilizeUrl[serilizeUrl.length-2])
    const axios = require('axios');
  const rubles = require('rubles').rubles;
  return NextResponse.json({ success: "Это Get запрос, а для выполнения скрипта нужен POST :)"})
}