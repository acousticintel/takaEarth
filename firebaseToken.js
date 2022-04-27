import { getToken } from "firebase/messaging";
import localforage from "localforage";
import { messaging } from "./firebase";

const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  //initializing firebase app
  init: async function () {
    if (messaging) {
      try {
        const tokenInLocalForage = await this.tokenInlocalforage();

        //if FCM token is already there just return the token
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        //requesting notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          //getting token from FCM
          const fcm_token = await getToken(messaging, {
            vapidKey:
              "BCu0zC8R5yXJ0CbUB2bNHr1LwHkTJVglN_aRzc5r63698ziHS0mIsIfENxBn_N5i6V8dBHh9W85X934aGzL11ak",
          });
          if (fcm_token) {
            //setting FCM token in indexed db using localforage
            localforage.setItem("fcm_token", fcm_token);
            //return the FCM token after saving it
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
