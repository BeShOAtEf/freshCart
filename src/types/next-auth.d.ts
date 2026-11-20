// import NextAuth,{user} from "next-auth"
// import { JWT } from "next-auth/jwt"
// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//     interface User{
//         user:{
//             email:string,
//             name:string,
//             role:string,
//             image?:string
//         },
//         token:string,
//     }

//   interface Session {
//    user:User['user'],
//    token?:string
//   }
// }




// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT extends User {
//     user?: {
//       email: string;
//       name: string;
//       role: string;
//     };
//     token?: string;
//   }
//   }

import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    user?: {
      name: string;
      email: string;
      role: string;
      image?: string;
    };
    token?: string;
  }

  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
    token?: string;
  }
}