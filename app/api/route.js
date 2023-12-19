import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    return NextResponse.json({ success: "здесь пока ничего нет :)" })
  } catch (err) {
    NextResponse.json({ err })
  }
}