import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
const path = require("path");

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('image');

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const pathImage = path.resolve(`./public/image-manager/${file.name}`)
  await writeFile(pathImage, buffer)

  return NextResponse.json({ success: true })
}