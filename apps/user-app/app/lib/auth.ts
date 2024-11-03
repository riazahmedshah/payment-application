import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@repo/db/client";
import { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

// const db = new PrismaClient();

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials) {
                    console.error("No credentials provided");
                    return null;
                }

                try {
                    const user = await db.user.findFirst({
                        where: {
                            number: credentials.phone
                        }
                    });

                    if (!user) {
                        console.error("User not found");
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isPasswordValid) {
                        console.error("Invalid password");
                        return null;
                    }
                    else{
                        return user;
                    }

                    
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null; // Return null to indicate failure
                }
            }
        })
    ],
    secret: "secret",
    callbacks: {
        async jwt({ token, user }:{token:JWT, user:User}){
            if(user){
                token._id = user.id?.toString();
                token.username = user.name;
            }
            return token
        },
        async session({ session, token } : {session:Session, token:JWT}) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
            } else {
                console.error("Token or token.sub is undefined");
            }
            return session;
        },
        
        // async redirect() {
        //     return 'http://localhost:3000'; // Force redirect to port 3000
        // }
        
    }
};
