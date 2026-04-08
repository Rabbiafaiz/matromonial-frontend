// // src/components/NotificationHandler.tsx
// import { useEffect } from "react";
// import { getToken, onMessage } from "firebase/messaging";
// import { messaging } from "@/firebase/firebase";

// const NotificationHandler = () => {
//   useEffect(() => {
//     if (typeof window !== "undefined" && messaging) {
//       const requestPermission = async () => {
//         try {
//           const permission = await Notification.requestPermission();
//           if (permission === "granted") {
//             if (messaging) {
//               const token = await getToken(messaging, {
//                 vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
//               });
//               console.log("FCM Token:", token);
//               // Send token to your backend
//               await fetch("/api/save-token", {
//                 method: "POST",
//                 body: JSON.stringify({ token }),
//               });
//             }
//           }
//         } catch (error) {
//           console.error("Error requesting permission:", error);
//         }
//       };

//       requestPermission();

//       // Listen for foreground messages
//       onMessage(messaging, (payload) => {
//         console.log("Foreground message received:", payload);
//         // Display a notification or update UI
//       });
//     }
//   }, []);

//   return null; // This component doesn't render anything
// };

// export default NotificationHandler;

// src/components/NotificationHandler.tsx
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "@/firebase/firebase";

const NotificationHandler = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && messaging) {
      const requestPermission = async () => {
        try {
          // Check if service worker is supported
          if ("serviceWorker" in navigator) {
            const permission = await Notification.requestPermission();
            if (permission === "granted" && messaging) {
              const token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
              });
              console.log("FCM Token:", token);
              localStorage.setItem('fcm_token', token)
              // Send token to your backend
              // await fetch("/api/save-token", {
              //   method: "POST",
              //   body: JSON.stringify({ token }),
              // });
            }
          } else {
            console.error("Service Worker is not supported in this browser.");
          }
        } catch (error) {
          console.error("Error requesting permission:", error);
        }
      };

      requestPermission();

      // Listen for foreground messages
      onMessage(messaging, (payload) => {
        console.log("Foreground message received:", payload);
        // Display a notification or update UI
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default NotificationHandler;