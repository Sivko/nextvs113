import { getLogs } from "@/Modals/LogsModal"
import { NextResponse } from "next/server"

export async function GET(req) {

  try {
    const searchParams = req.nextUrl.searchParams
    const token = searchParams.get('token')
    if (!token) return NextResponse.json({ success: "not Token" })
    const data = await getLogs({ token });
    // console.log(token, "DATA", data);
    return NextResponse.json(data)
  } catch (err) {
    NextResponse.json({ err })
  }
}