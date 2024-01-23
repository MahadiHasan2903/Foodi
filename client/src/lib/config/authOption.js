import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/api";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "text" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;

        try {
          const loginData = await api.auth.login({
            email: email,
            password: password,
          });

          const user = {
            id: loginData.id,
            email: loginData.email,
            name: loginData.name,
            role: loginData.role,
            accessToken: loginData.accessToken,
            phoneNumber: loginData.phoneNumber,
            avatar: loginData.avatar,
            orders: loginData.orders,
          };
          // console.log("Logged in User:", user);

          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          throw error;
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    jwt: ({ token, user }) => {
      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      return (session = token);
    },
  },
};
