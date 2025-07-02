import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            isAdmin: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
    }
}