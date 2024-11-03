// import db from "@repo/db/client";


import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


// const client = new PrismaClient();


// export const GET = async () => {
//     const password = "123456";
    
//     const hashedPassword = await bcrypt.hash(password,10);
//     await db.user.create({
//         data:{
//             name:"test",
//             email:"test@gmail.com",
//             number:"1231231231",
//             password:hashedPassword
//         }
//     });
//     return NextResponse.json({mag:"Hi there"})
// }

export const GET = async () => {
    const session  = await getServerSession(authOptions);

    if(session){
        console.log(session)
        return NextResponse.json({
            user:session.user
        })
    };

    return NextResponse.json({
        msg:"You are not logged in"
    },{
        status:403
    });
}