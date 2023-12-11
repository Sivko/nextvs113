import { getLogs, setLog } from '@/modules/LogsModule';
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
  const version = "2";

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

  try {
    const tmp = await req.json()
    const data = tmp.data;
    let newData = { "type": "companies", "id": data.id, "attributes": { "customs": {} } };
    let constants = await axios.get('https://app.salesap.ru/api/v1/constants', options);
    let constant = constants.data.data;
    if (!constants?.data?.data) {
      setLog({ url_query: "https://app.salesap.ru/api/v1/constants", res_crm: constants.data, res_code_crm: constants.status, const_id, token, version });
      return NextResponse.json({ error: "err" })
    }
    let webScript = constant.find(obj => obj.id == const_id)?.attributes?.value
    if (!webScript) {
      throw new Error(`Нет доступа к константе. status: ${constants.status}, доступные константы: ${constant.map(obj => obj.id).join(", ")}`);
    }
    const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
    let compute = new AsyncFunction('data', 'newData', 'rubles', 'options', 'axios', webScript);
    let computeResult = await compute(data, newData, rubles, options, axios)
    const url_query = 'https://app.salesap.ru/api/v1/' + computeResult.type + '/' + data.id;
    const resEnd = await axios.patch(url_query, JSON.stringify({ "data": computeResult }), options);
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
  try {
    return NextResponse.json({ success: "Это Get запрос, а для выполнения скрипта нужен POST :)" })
  } catch (err) {
    NextResponse.json({ err })
  }
}