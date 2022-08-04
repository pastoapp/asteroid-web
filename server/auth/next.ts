import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const options = {
    providers: [
        CredentialsProvider({
            name: "asteroid",
            credentials: {
                uid: {
                    label: "uid",
                    type: "text",
                    placeholder: "Ex. da97a3c5-cc0b-47ac-925a-9c69a5b0c924",
                },
                signature: {
                    label: "signature",
                    type: "text",
                    placeholder: "Ex. NimzVevW3gq...Hojbofr6he1SneQzA=",
                },
            },
            async authorize(credentials: any, req) {
                console.log(credentials);

                const { uid, signature } = credentials;
                const response = await fetch(`${import.meta.env.VITE_ASTEROID_SERVER_URL}/login`, {
                    method: "POST",
                    body: JSON.stringify({ id: uid, signature }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const user = await response.json();

                if (!response.ok) {
                    throw new Error("Invalid credentials");
                }

                if (response.ok && user) return user;

                // no data could be retrieved
                return null;
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    pages: {
        signIn: "/login",
        //   signOut: "/",
    },
    callbacks: {
        async jwt(args: any) {
            console.log(args);
            const { token, user } = args
            if (user) {
                token.token = user.token;
                return {
                    ...token,
                    // accessToken, refreshToken
                };
            }

            return token;
        },
        async session(args: any) {
            console.log(args)
            const { session, token } = args
            session.expires = token.exp as string;
            session.user!.token = token.token;

            return session;
        },
    },
    debug: process.env.NODE_ENV !== "production",
};

const authHandler = (req: any, res: any) => NextAuth(req, res, options);
export default authHandler;