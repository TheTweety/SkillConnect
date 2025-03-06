import NextAuth from "next-auth";

export const authOptions = {
    debug: true,
    providers: [
        {
            id: "descope",
            name: "Descope",
            type: "oauth",
            wellKnown: process.env.DESCOPE_WELL_KNOWN,
            authorization: { params: { scope: "openid email profile" } },
            clientId: process.env.DESCOPE_CLIENT_ID,
            clientSecret: process.env.DESCOPE_CLIENT_SECRET,
            checks: ["state"],
        },
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
