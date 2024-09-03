"use client";
import { useEffect, useRef } from "react";
import { refreshToken } from "../actions/actions"; // Adjust path as needed
import { useSession, signOut } from "next-auth/react";

export function useAuthRefresh() {
//   const { data: session, update } = useSession();
//   const isRefreshingRef = useRef(false);

//   useEffect(() => {
//     const checkToken = async () => {
//       if (!session?.user?.accessToken || !session?.user?.accessTokenExpiry) {
//         console.log("No accessToken or accessTokenExpiry available");
//         return;
//       }

//       const currentTime = Math.round(Date.now() / 1000);
//       if (currentTime >= session.user.accessTokenExpiry) {
//         if (isRefreshingRef.current) {
//           console.log("Token refresh already in progress");
//           return;
//         }

//         console.log("Starting token refresh...");
//         isRefreshingRef.current = true;

//         try {
//           const refreshStart = Date.now();
//           console.log(
//             "Token refresh started at:",
//             new Date(refreshStart).toISOString()
//           );

//           const response = await refreshToken(session.user.refreshToken);

//           const refreshEnd = Date.now();
//           console.log(
//             "Token refresh completed at:",
//             new Date(refreshEnd).toISOString()
//           );
//           console.log(
//             "Token refresh duration:",
//             refreshEnd - refreshStart,
//             "ms"
//           );

//           if (response?.accessToken) {
//             console.log("Access token successfully refreshed");

//             await update({
//               user: {
//                 ...session.user,
//                 accessToken: response.accessToken,
//                 accessTokenExpiry: Math.round(Date.now() / 1000) + 60 * 1, // Adjust expiry as needed
//               },
//             });
//           } else {
//             console.log("Token refresh failed, signing out");
//             signOut();
//           }
//         } catch (error) {
//           console.error("Error refreshing token:", error);
//           console.log("Signing out due to error");
//           signOut();
//         } finally {
//           isRefreshingRef.current = false;
//         }
//       } else {
//         console.log("Token is still valid");
//       }
//     };

//     checkToken();

//     const id = setInterval(checkToken, 30 * 1000);

//     return () => {
//       clearInterval(id);
//     };
//   }, [session, update]);
}
