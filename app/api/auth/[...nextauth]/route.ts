import NextAuth
from "next-auth";

import { authOptions }
from "@/lib/auth";

const handler =
  NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};

// import NextAuth, { NextAuthOptions, } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";

// // ✅ Export authOptions (needed for session access)
// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials?.email },
//         });

//         if (!user) return null;

//         const isValid = await bcrypt.compare(
//           credentials!.password,
//           user.password
//         );

//         if (!isValid) return null;

//         return {
//           id: user.id,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
// };

// // ✅ Create handler from authOptions
// const handler = NextAuth(authOptions);

// // ✅ Export routes
// export { handler as GET, handler as POST };