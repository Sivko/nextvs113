// app/api/route.js 👈🏽

import { NextResponse } from "next/server";
// import axios from 'axios';
import fsPromises from 'fs/promises';

export async function GET(request) {
  // Do whatever you want
  const folder = './public/image-manager';
  const jsonData = await fsPromises.readdir(folder)

  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const idDeals = url.searchParams.get("ids[]");
  const userId = url.searchParams.get("user_id");
  const alone = url.searchParams.get("alone");

  const images = jsonData.filter(e => e.includes(idDeals));


  // console.log(c);
  // https://vs113.ru/right_menu?hash=38ce4afs65&ids=&token=O0ApruzXzguScRie3ilPQnUOPgGnK0BHHvmNgZzit3_g&type=users&user_id=76790
  // https://example.com?ids%5B%5D=7272721&token=O0ApruzXzguScRies3ilPQnUOPgGnK0BHHvmNgZzit3_g&type=deals&user_id=76790
  return NextResponse.json({ data: images }, { status: 200 });
}