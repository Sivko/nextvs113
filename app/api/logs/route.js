import { getLogs } from "@/Modals/LogsModal"
import { NextResponse } from "next/server"
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const dynamicParams = true

export async function GET(req) {

  try {
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    const token = params.get("token");
    if (!token) return NextResponse.json({ success: "not Token" })
    const data = await getLogs({ token });
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ err })
  }
}