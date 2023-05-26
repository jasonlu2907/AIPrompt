import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // In order to find the current user
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        // serverless ->lambda -> dynamodb
        await connectToDB();

        //check if user is existing
        const userExists = await User.findOne({
          email: profile.email,
        });

        // console.log(profile); { iss: 'https://accounts.google.com', given_name: '', family_name: '', locale: 'en', iat: , exp:  }
        //if not, create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
