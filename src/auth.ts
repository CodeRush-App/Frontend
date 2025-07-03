import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';
import { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
import { checkUserExists, loginUser, registerUser } from '@/app/api/user';

interface CustomJwtPayload extends jwt.JwtPayload {
    id?: string;
    userId?: string;
    isAdmin?: boolean;
}

export const authOptions: NextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials: Partial<Record<"email" | "password", unknown>>) => {
                try {
                    const email = typeof credentials?.email === "string" ? credentials.email : undefined;
                    const password = typeof credentials?.password === "string" ? credentials.password : undefined;

                    if (!email || !password)
                        throw new Error("Email and password are required");

                    // Check if user exists and verify provider type
                    const existingUserResponse = await checkUserExists(email);

                    if (existingUserResponse?.user) {
                        const existingUser = existingUserResponse.user;
                        // Check if user was created via OAuth
                        if (existingUser.provider && existingUser.provider !== 'credentials') {
                            const error = new Error(`This email is registered with ${existingUser.provider}. Please sign in using ${existingUser.provider} instead.`);
                            error.name = 'ProviderMismatch';
                            throw error;
                        }
                    }

                    // Try to verify credentials
                    const loginResponse = await loginUser({ email, password });

                    if (!loginResponse?.user) {
                        throw new Error("Invalid credentials");
                    }

                    // Return the user data
                    return {
                        id: loginResponse.user.id,
                        name: loginResponse.user.name,
                        email: loginResponse.user.email,
                        isAdmin: loginResponse.user.isAdmin || false,
                    };
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null;
                }
            }
        }),
        GitHub,
        Google
    ],
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
    },
    callbacks: {
        async signIn({ user, account }) {
            // Always allow credentials sign-in
            if (account?.provider === 'credentials') return true;

            // Handle OAuth providers
            if (!user?.email) {
                console.error("Email address not provided by OAuth provider");
                return false;
            }

            try {
                const { email, name, id: oauthId } = user;

                // Check if user already exists by email
                try {
                    const existingUserResponse = await checkUserExists(email);
                    const existingUser = existingUserResponse.user;

                    // Check if user was created with credentials
                    if (existingUser.provider === 'credentials') {
                        console.error("This email is already registered with email/password. Please sign in using your email and password instead.");
                        return false;
                    }

                    // Check if user was created with a different OAuth provider
                    if (existingUser.provider !== account?.provider) {
                        console.error(`This email is already registered with ${existingUser.provider}. Please sign in using ${existingUser.provider} instead.`);
                        return false;
                    }

                    // User exists with same OAuth provider - use existing user ID and isAdmin
                    user.id = existingUser.id;
                    user.isAdmin = existingUser.isAdmin || false;
                } catch (error) {
                    // If not 404 for user not found, throw again otherwise continue creating new user
                    if (error instanceof AxiosError && error.response?.status !== 404) throw error;

                    // Create new user with all required fields
                    const newUserResponse = await registerUser({
                        name: name,
                        username: email?.split('@')[0] || `oauth_${oauthId}`,
                        email,
                        password: oauthId,
                        providerId: oauthId,
                        provider: account?.provider || "OAuth",
                    });
                    const newUser = newUserResponse.user;
                    user.id = newUser.id;
                    user.isAdmin = newUser.isAdmin || false;
                }
            } catch (error) {
                console.error("Error during OAuth sign-in:", error);
                return false;
            }

            return true;
        },
        jwt({ token, user }: { token: JWT; user: User | null }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin || false;
            }
            return token;
        },
        session({ session, token }: { session: Session; token: JWT }) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin || false;
            return session;
        },
    },
    jwt: {
        encode: async ({ secret, token }) => {
            if (!secret) return "";

            return jwt.sign({ id: token?.id, isAdmin: token?.isAdmin, name: token?.name, email: token?.email }, secret as jwt.Secret, {
                algorithm: "HS256",
                expiresIn: 30 * 24 * 60 * 60, // 30 days
            })
        },
        decode: async ({ secret, token }) => {
            if (!secret) {
                return null;
            }
            const payload = jwt.verify(token!, secret as jwt.Secret, { algorithms: ["HS256"] }) as jwt.JwtPayload;
            const customPayload = payload as CustomJwtPayload;
            return {
                ...customPayload,
                id: customPayload.id ?? customPayload.userId ?? "",
                isAdmin: customPayload.isAdmin ?? false,
            } as JWT;
        },
    }
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);