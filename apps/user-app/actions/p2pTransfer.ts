"use server"
import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../app/lib/auth"


export const p2pTransfer = async(to : string, amount:Number) =>{
    const session = await getServerSession(authOptions);
    const from = session?.user;

    if(!from?.id){
        return{
            message:"Error while sending money"
        }
    };

    const toUser = await db.user.findFirst({
        where:{
            number:to
        }
    });

    if(!toUser){
        return{
            message:"User not found"
        }
    };
    
    await db.$transaction(async(tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where:{userId:Number(from.id)}
        });

        if(!fromBalance || fromBalance.amount < Number(amount)){
            throw new Error("Insufficient funds")
        };

        await tx.balance.update({
            where:{
                userId:Number(from.id)
            },
            data:{
                amount:{
                    decrement:Number(amount)
                }
            }
        });


        await tx.balance.update({
            where:{
                userId:Number(toUser.id)
            },
            data:{
                amount:{
                    increment:Number(amount)
                }
            }
        });

        tx.p2pTransfer.create({
            data:{
                fromUserId:Number(from.id),
                amount:Number(amount),
                timestamp:new Date(),
                toUserId:toUser.id
            }
        })
        

        
    })
}
