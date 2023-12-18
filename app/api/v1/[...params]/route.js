import { setLog } from '@/modules/LogsModule';
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
const path = require("path");

export async function POST(req) {
  const axios = require('axios');
  const rubles = require('rubles').rubles;


  const serilizeUrl = req.url.split('/')
  const getAddress = serilizeUrl.length > 7;

  const token = serilizeUrl[getAddress ? serilizeUrl.length -  2 : serilizeUrl.length - 1]
  const const_id = serilizeUrl[getAddress ? serilizeUrl.length - 3 : serilizeUrl.length - 2]

  const address = getAddress ? `https://${serilizeUrl[serilizeUrl.length-1]}` : `https://app.salesap.ru`
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
    let constants = await axios.get(`${address}/api/v1/constants`, options)
    let constant = constants.data.data;
    if (!constants?.data?.data) {
      setLog({ url_query: `${address}/api/v1/constants`, res_crm: constants.data, res_code_crm: constants.status, const_id, token, version, address });
      return NextResponse.json({ error: "err" })
    }
    let webScript = constant.find(obj => obj.id == const_id)?.attributes?.value
    if (!webScript) {
      throw new Error(`Нет доступа к константе. status: ${constants.status}, доступные константы: ${constant.map(obj => obj.id).join(", ")}`);
    }

    let compute = new Function('data', 'newData', 'rubles', webScript);
    const computeResult = compute(data, newData, rubles);
    const url_query = `${address}/api/v1/` + computeResult.type + '/' + data.id;
    const resEnd = await axios.patch(url_query, JSON.stringify({ "data": computeResult }), options)
    const time = performance.now() - startTime;

    if (resEnd.status == 404 || resEnd.status == 500) {
      setLog({ url_query, res_code_crm: resEnd.status, const_id, token, time, version, address });
    } else if (resEnd.status !== 200) {
      setLog({ url_query, res_crm: resEnd.data, res_code_crm: resEnd.status, const_id, token, time, version, address });
    } else {
      setLog({ url_query, res_code_crm: resEnd.status, const_id, token, time, version, address });
    }
    return NextResponse.json({ success: "Ok" })
  } catch (err) {
    setLog({ const_id, token, error: err, version, address });
    return NextResponse.json({ error: err })
  }
}

export async function GET(req) {
  const serilizeUrl = req.url.split('/')
  const axios = require('axios');
  const rubles = require('rubles').rubles;
  return NextResponse.json({ success: "Это Get запрос, а для выполнения скрипта нужен POST :)" })
}