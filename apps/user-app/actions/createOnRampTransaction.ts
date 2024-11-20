"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../app/lib/auth"
import db from "@repo/db/client"

export const createOnRampTransaction = async (provider:string,amount:number) => {
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        return {
            msg:"Not authenticated"
        }
    };
    try {
        const token = (Math.random()*1000).toString();
        await db.onRampTransaction.create({
            data:{
                status:"Processing",
                token,
                provider,
                amount:amount*100,
                startTime:new Date(),
                userId:Number(session?.user?.id),
            }
        });
    
        return {
            msg:"OnRampTransaction Done"
        };
    } catch (error) {
        console.error("error during onRamp",error)
    }


} 