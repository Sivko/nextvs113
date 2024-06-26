import { setLog } from '@/Modals/LogsModal';
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import moment from 'moment';
import 'moment/locale/ru';
import petrovich from "petrovich";

const path = require("path");

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const axios = require('axios');
  const rubles = require('rubles').rubles;


  const serilizeUrl = req.url.split('/')
  const getAddress = serilizeUrl.length > 7;

  const token = serilizeUrl[getAddress ? serilizeUrl.length - 2 : serilizeUrl.length - 1]
  const const_id = serilizeUrl[getAddress ? serilizeUrl.length - 3 : serilizeUrl.length - 2]

  const address = getAddress ? `https://${serilizeUrl[serilizeUrl.length - 1]}` : `https://app.salesap.ru`
  const startTime = performance.now()
  const version = "1";

  const options = {
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer ' + token,
      'S2-Allow-Websockets': true
    },
    validateStatus: function (status) {
      return true
    }
  }

  // newData.type = "deals";
  // let text = rubles(data.custom_116269);
  // if (text) { newData.attributes.description = text.charAt(0).toUpperCase() + text.slice(1) } 
  // else { newData.attributes.description = 0 } return newData

  // let fullName = data.manager_name; let arrName = fullName.split(' '); let result = arrName[0]+' '+arrName[1][0]+'. '+arrName[2][0]+'.'; newData.attributes.customs.custom_103686 = result; return newData

  // newData.type = "deals";   let text = rubles(data.custom_101206);   if (text) { newData.attributes.customs.custom_103046 = text.charAt(0).toUpperCase() + text.slice(1) }    else { newData.attributes.customs.custom_103046 = 0 } return newData
  const request = await req.json()
  const data = request.data;
  try {

    let newData = { "type": "companies", "id": data.id, "attributes": { "customs": {} } };
    let constants = await axios.get(`${address}/api/v1/constants`, options)
    let constant = constants.data.data;
    if (!constants?.data?.data) {
      setLog({ url_query: `${address}/api/v1/constants`, res_crm: constants.data, res_code_crm: constants.status, const_id, token, version, address, data: newData });
      return NextResponse.json({ error: "err" })
    }
    let webScript = constant.find(obj => obj.id == const_id)?.attributes?.value
    if (!webScript) {
      throw new Error(`Нет доступа к константе. status: ${constants.status}, доступные константы: ${constant.map(obj => obj.id).join(", ")}`);
    }

    let compute = new Function('data', 'newData', 'rubles', 'axios', 'moment', 'petrovich','request', webScript);
    const computeResult = compute(data, newData, rubles, axios, moment, petrovich, request);
    const url_query = `${address}/api/v1/` + computeResult.type + '/' + data.id;
    const resEnd = await axios.patch(url_query, JSON.stringify({ "data": computeResult }), options)
    const time = performance.now() - startTime;

    if (resEnd.status == 404 || resEnd.status == 500) {
      setLog({ url_query, res_code_crm: resEnd.status, const_id, token, time, version, address, data });
    } else if (resEnd.status !== 200) {
      setLog({ url_query, res_crm: resEnd.data, res_code_crm: resEnd.status, const_id, token, time, version, address, data });
    } else {
      setLog({ url_query, res_crm: resEnd.data, res_code_crm: resEnd.status, const_id, token, time, version, address, data });
    }
    return NextResponse.json({ success: "Ok" })
  } catch (err) {
    setLog({ const_id, token, error: err, version, address, data });
    return NextResponse.json({ error: err })
  }
}

export async function GET(req) {
  // const serilizeUrl = req.url.split('/')
  // const axios = require('axios');
  // const rubles = require('rubles').rubles;
  return NextResponse.json({ success: `Это Get запрос, а для выполнения скрипта нужен POST :) ${moment().format("MM.dd.YYYY")}` })
}