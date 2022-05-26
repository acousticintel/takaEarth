import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  doc,
  addDoc,
  updateDoc,
  getDoc,
  collection,
  onSnapshot,
  orderBy,
  where,
  query,
  serverTimestamp,
} from "@firebase/firestore";
//custom
import OneSignal from "react-onesignal";

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  const { data: session, status } = useSession();
  //hold app states
  const [userPoints, setUserPoints] = useState(null);
  //controls modals
  const [reqModal, setReqModal] = useState(false);
  const [recModal, setRecModal] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  //product selected
  const [event, setEvent] = useState(null);
  const [prod, setProd] = useState(null);
  const [side, setSide] = useState(false);
  const [orders, setOrders] = useState([]);
  const [redeem, setRedeem] = useState(false);
  const [selRequest, setSelRequest] = useState(null);
  //hold data
  const [posts, setPosts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);

  const onSetReqModal = (val) => setReqModal(val);
  const onSetRecModal = (val) => setRecModal(val);
  const onSetQrModal = (val) => setQrModal(val);

  const onSetProd = (val) => setProd(val);
  const onSetEvent = (val) => setEvent(val);

  const onSetSide = (val) => setSide(val);
  const onSetUserPoints = (val) => setUserPoints(val);
  const onSetRedeem = (val) => setRedeem(val);
  const onSetSelRequest = (val) => setSelRequest(val);
  const onSetOrders = (val) => setOrders(val);
  const onSetPosts = (val) => {
    if (val?.length > 0) setPosts(val);
  };
  const onSetOffers = (val) => {
    if (val?.length > 0) setOffers(val);
  };
  const onSetRequests = (val) => {
    if (val?.length > 0) setRequests(val);
  };

  //Enable Push Notifications
  useEffect(async () => {
    await OneSignal.init({
      appId: "599b662d-529b-4843-a940-ba64c1e174c0",
      notifyButton: {
        enable: true,
      },
      allowLocalhostAsSecureOrigin: true,
    });
  }, []);

  //useEffect(() => { }, []);
  useEffect(() => {
    SetPushExternalId();
    createUser();
    readPostsHistory();
    readOffersPromos();
    readUserData();
    readRequests();
  }, [db, session]);

  async function readPostsHistory() {
    if (session?.user) {
      const q = query(
        collection(db, `collections/${session?.user.uid}/posts`),
        orderBy("timestamp", "desc")
      );
      return onSnapshot(q, (snapshot) => {
        onSetPosts(snapshot.docs);
      });
    }
  }

  async function SetPushExternalId() {
    if (session?.user) {
      OneSignal.getExternalUserId().then(function (externalUserId) {
        console.log("externalUserId: ", externalUserId);
        if (!externalUserId) {
          OneSignal.setExternalUserId(session.user.uid);
        }
      });
    }
  }

  async function createUser() {
    if (session?.user) {
      const docRef = doc(db, "users", session.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Add a new document in collection "users"
        await updateDoc(doc(db, "users", session.user.uid), {
          name: session.user.name,
          email: session.user.email,
        });
      }
    }
  }

  async function logInstallData(log) {
    try {
      if (session?.user) {
        const docRef = doc(db, "users", session.user.uid);
        const docSnap = await getDoc(docRef);
        console.log(log);
        if (docSnap.exists()) {
          // Add a new document in collection "installs"
          await updateDoc(doc(db, "users", session.user.uid), {
            ...log,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function readUserData() {
    if (session?.user) {
      const docRef = doc(db, "users", session.user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          // Add a new document in collection "cities"
          let p = doc.data().points ? doc.data().points : 0;
          onSetUserPoints(p);
        }
      });
    }
  }

  async function readOffersPromos() {
    const q = query(collection(db, "offers"), orderBy("name", "desc"));
    return onSnapshot(q, (snapshot) => {
      const o = [];
      snapshot.forEach((doc) => {
        o.push(doc.data());
      });
      onSetOffers(o);
    });
  }

  async function readRequests() {
    if (session?.user) {
      const q = query(
        collection(db, "requests"),
        where("userId", "==", session?.user.uid),
        orderBy("timestamp", "desc")
      );
      return onSnapshot(q, (snapshot) => {
        const d = [];
        snapshot.forEach((doc) => {
          d.push(doc.data());
        });
        onSetRequests(d);
      });
    }
  }

  async function uploadRequest(type) {
    return new Promise(async (resolve, reject) => {
      try {
        if (status !== "unauthenticated") {
          const docRef = await addDoc(collection(db, `requests`), {
            profileImg: session.user.image,
            username: session.user.name,
            userId: session.user.uid,
            status: "pending",
            reqType: type,
            orders,
            timestamp: serverTimestamp(),
          });
          //console.log('New doc added with ID', docRef.id);

          if (docRef) {
            onSetOrders([]);
            resolve({ status: 200 });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function addToBin(order) {
    return new Promise((resolve, reject) => {
      if (order?.cat && order?.qntt && order.name && order.recycleCat) {
        let o = [...orders];
        o.push(order);
        onSetOrders(o);
        resolve({ status: 200 });
      } else {
        reject("Invalid Information");
      }
    });
  }

  async function removeFromBin(index) {
    return new Promise((resolve, reject) => {
      if (index > -1) {
        let o = [...orders];
        o.splice(index, 1); // 2nd parameter means remove one item only
        console.log(o);
        onSetOrders(o);
        resolve({ status: 200 });
      } else {
        reject("Invalid index");
      }
    });
  }

  return {
    logInstallData,
    orders,
    addToBin,
    removeFromBin,
    reqModal,
    onSetReqModal,
    recModal,
    onSetRecModal,
    qrModal,
    onSetQrModal,
    side,
    onSetSide,
    prod,
    event,
    onSetProd,
    onSetEvent,
    redeem,
    onSetRedeem,
    selRequest,
    onSetSelRequest,
    requests,
    onSetRequests,
    userPoints,
    posts,
    offers,
    uploadRequest,
  };
}
