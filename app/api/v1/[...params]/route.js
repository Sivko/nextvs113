import { setLog } from '@/modules/LogsModule';
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
const path = require("path");

export async function POST(req) {
  const axios = require('axios');
  const rubles = require('rubles').rubles;


  const serilizeUrl = req.url.split('/')

  const token = serilizeUrl[serilizeUrl.length - 1]
  const const_id = serilizeUrl[serilizeUrl.length - 2]
  const startTime = performance.now()
  const version = "1";

  const options = {
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer ' + token,
      'S2-Allow-Websockets': true
      // 'Accept': '*'
    },
    validateStatus: function (status) {
      return true
    }
  }

  // newData.type = "deals";
  // let text = rubles(data.custom_116269);
  // if (text) { newData.attributes.description = text.charAt(0).toUpperCase() + text.slice(1) } 
  // else { newData.attributes.description = 0 } return newData

  try {
    const tmp = await req.json()
    const data = tmp.data;
    let newData = { "type": "companies", "id": data.id, "attributes": { "customs": {} } };
    let constants = await axios.get('https://app.salesap.ru/api/v1/constants', options)
    let constant = constants.data.data;
    if (!constants?.data?.data[0]?.id) {
      throw new Error(`Нет доступа к константе. status: ${constants.status}, data: ${JSON.stringify(constant)}`);
    }
    let webScript = constant.find(obj => obj.id == const_id)?.attributes?.value
    if (!webScript) {
      throw new Error(`Нет доступа к константе. status: ${constants.status}, data: ${JSON.stringify(constant)}`);
    }

    let compute = new Function('data', 'newData', 'rubles', webScript);
    const computeResult = compute(data, newData, rubles);
    const url_query = 'https://app.salesap.ru/api/v1/' + computeResult.type + '/' + data.id;
    const resEnd = await axios.patch(url_query, JSON.stringify({ "data": computeResult }), options)
    const time = performance.now() - startTime;

    if (resEnd.status == 404 || resEnd.status == 500) {
      setLog({ url_query, res_code_crm: resEnd.status, const_id, token, time, version });
    } else if (resEnd.status !== 200) {
      setLog({ url_query, res_crm: resEnd.data.data, res_code_crm: resEnd.status, const_id, token, time, version });
    } else {
      setLog({ url_query, res_code_crm: resEnd.status, const_id, token, time, version });
    }
    return NextResponse.json({ success: "Ok" })
  } catch (err) {
    setLog({ const_id, token, error: err, version });
    return NextResponse.json({ error: err })
  }
}

export async function GET(req) {
  const serilizeUrl = req.url.split('/')
  console.log(serilizeUrl[serilizeUrl.length - 1])
  console.log(serilizeUrl[serilizeUrl.length - 2])
  const axios = require('axios');
  const rubles = require('rubles').rubles;
  return NextResponse.json({ success: "Это Get запрос, а для выполнения скрипта нужен POST :)" })
}