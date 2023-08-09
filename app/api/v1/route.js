import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
const path = require("path");

export async function POST(req) {
  const axios = require('axios');
  const rubles = require('rubles').rubles;
  
  const data = req.body.data
  let newData = {"type": "companies", "id": data.id, "attributes":{"customs": {}, "allow-websockets": true  } };
  let constants = await axios.get('https://app.salesap.ru/api/v1/constants',options).catch((err)=>{console.log(err);res.json(err)});
  let constant = constants.data.data;
  let webScript = constant.find(obj => obj.id == scriptId).attributes.value
  
  let compute = new Function('data','newData','rubles', webScript);
  const resEnd = await axios.patch('https://app.salesap.ru/api/v1/'+compute(data,newData,rubles).type+'/'+data.id, JSON.stringify({"data": compute(data,newData,rubles) }), options).catch((err)=>{console.log(err);res.json(err)})
  res.json({'res': resEnd})
  return NextResponse.json({ success: true })
}