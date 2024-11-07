import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import db from "@repo/db/client"

export const POST = async(req:NextRequest) => {
    const {name,email,number,password} = await req.json();

    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await db.user.create({
            data:{
                name,
                email,
                number,
                password:hashedPassword
            }
        });
        return NextResponse.json({
            msg:"User created successfully",user
        })
    } catch (error) {
        console.error("Error while signin up user",error)
    }
}