export const dynamic = 'force-dynamic'
import prisma from "@/app/lib/prisma"
import { unstable_noStore as noStore } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
  noStore();
  const data = await prisma.notes.findMany();
  return Response.json(data)
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    noStore();
    const { notes } = await req.json();
    const data = await prisma.notes.create({ data: { notes } })
    if (data) {
      return Response.json({ message: 'Added Successfully' });
    }
    return Response.json({ message: 'Something went wrong.' });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err)
    }
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    noStore();
    const { id, notes } = await req.json();
    const data = await prisma.notes.update({
      where: { id },
      data: { notes }
    })
    if (data) {
      return Response.json({ message: 'Successfully Updated' })
    }
    return Response.json({ message: 'Something went wrong' })
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ message: err.message }, { status: 500 })
    }
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    noStore();
    const { id } = await req.json();
    const data = await prisma.notes.delete({ where: { id } })
    if (data) {
      return Response.json({ message: 'Successfully Deleted' })
    }
    return Response.json({ message: 'Something went wrong' })
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ message: err.message }, { status: 500 })
    }
  }
}