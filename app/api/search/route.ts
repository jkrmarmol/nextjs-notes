import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const search = req.nextUrl.searchParams.get('notes');
  if (search) {
    const data = await prisma.notes.findMany({
      where: {
        notes: {
          contains: search
        }
      }
    })
    return NextResponse.json(data)
  }
  const data = await prisma.notes.findMany();
  return Response.json(data)
}
