// "use client";

// import { useEffect } from 'react';

// declare global {
//   interface Window {
//     FB: any;
//     fbAsyncInit: () => void;
//   }
// }

// interface FacebookAuthResponse {
//   accessToken: string;
//   expiresIn: string;
//   signedRequest: string;
//   userID: string;
// }

// export function useFacebookSDK() {
//   useEffect(() => {
//     const initFacebookSdk = () => {
//       return new Promise<void>((resolve) => {
//         // Load the SDK asynchronously
//         (function (d, s, id) {
//           var js, fjs = d.getElementsByTagName(s)[0];
//           if (d.getElementById(id)) { return; }
//           js = d.createElement(s) as HTMLScriptElement; 
//           js.id = id;
//           js.src = "https://connect.facebook.net/en_US/sdk.js";
//           fjs.parentNode!.insertBefore(js, fjs);
//         }(document, 'script', 'facebook-jssdk'));

//         // Initialize the SDK once it's loaded
//         window.fbAsyncInit = function () {
//           window.FB.init({
//             appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
//             cookie: true,
//             xfbml: true,
//             version: 'v16.0'
//           });
          
//           resolve();
//         };
//       });
//     };

//     initFacebookSdk().catch(error => {
//       console.error("Failed to initialize Facebook SDK:", error);
//     });
//   }, []);

//   const connectAccount = () => {
//     return new Promise<FacebookAuthResponse>((resolve, reject) => {
//       window.FB.login((response: { authResponse: FacebookAuthResponse }) => {
//         if (response.authResponse) {
//           resolve(response.authResponse);
//         } else {
//           reject('User cancelled login or did not fully authorize.');
//         }
//       }, { scope: 'public_profile,email' });
//     });
//   };

//   return { connectAccount };
// }

"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: string;
  signedRequest: string;
  userID: string;
}

export function useFacebookSDK() {
  const [isSdkInitialized, setSdkInitialized] = useState(false);

  useEffect(() => {
    const initFacebookSdk = () => {
      return new Promise<void>((resolve) => {
        // Load the SDK asynchronously
        (function (d, s, id) {
          var js,
            fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s) as HTMLScriptElement;
          js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode!.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");

        // Initialize the SDK once it's loaded
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID, // Ensure this is set
            cookie: true,
            xfbml: true,
            version: "v16.0",
          });

          setSdkInitialized(true); // Mark the SDK as initialized
          resolve();
        };
      });
    };

    initFacebookSdk().catch((error) => {
      console.error("Failed to initialize Facebook SDK:", error);
    });
  }, []);

  const connectAccount = () => {
    return new Promise<FacebookAuthResponse>((resolve, reject) => {
      if (!isSdkInitialized) {
        reject("Facebook SDK is not initialized.");
        return;
      }

      window.FB.login(
        (response: { authResponse: FacebookAuthResponse }) => {
          if (response.authResponse) {
            resolve(response.authResponse);
          } else {
            reject("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "public_profile,email" }
      );
    });
  };

  return { connectAccount };
}
