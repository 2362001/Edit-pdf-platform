import { db } from './../../../prisma/db';
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST ( req: Request) {
    try {
        const { userId}= auth()
        const { title}= await req.json()
        
        if(!userId){
            return new NextResponse('Unauthor', {status:401})
        }

        const course = await db.course.create({
            data:{
                userId,
                title
            }
        })
        return NextResponse.json(course)

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server", {status:500})
    }
}