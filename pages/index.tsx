import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { Toaster } from "@/components/ui/toaster";
import { Swirly } from "@/components/svg";
import { DetailsRow } from "@/components/DetailsRow";
import { RsvpModalAndButtons } from "@/components/RsvpModalAndButtons";
import Footer from "@/components/Footer";
import { Great_Vibes } from "next/font/google";

const vibez = Great_Vibes({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "normal"
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "wedding-93e05.firebaseapp.com",
  projectId: "wedding-93e05",
  storageBucket: "wedding-93e05.appspot.com",
  messagingSenderId: "999042266591",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-EB0N99KNGT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [guest, setGuest] = useState({
    name: "",
    email: ""
  });
  const [submittedRsvp, setSubmittedRsvp] = useState(false);

  useEffect(() => {
    const guestName =
      new URLSearchParams(window.location.search).get("name") ?? "";
    const guestEmail =
      new URLSearchParams(window.location.search).get("email") ?? "";
    setGuest({ name: guestName, email: guestEmail });
  }, []);

  return (
    <main
      style={{
        height: "100vh",
        overflow: "scroll"
      }}
      className="text-xl"
    >
      <iframe
        scrolling="no"
        src="assets/invitation.html"
        className="w-full h-3/4"
        style={{
          overflow: "hidden"
        }}
      />
      <div className="flex justify-center items-center flex-col">
        <span
          style={vibez.style}
          className="p-10 text-7xl  w-100vw text-wrap text-center lg:w-1/2"
        >
          The Wedding of Shakoora & Nabeel
        </span>

        <>
          <span>TO:</span>
          <span>{guest.name.toUpperCase()}</span>
        </>

        <RsvpModalAndButtons
          guestName={guest.name}
          guestEmail={guest.email}
          submitted={submittedRsvp}
          setSubmitted={setSubmittedRsvp}
          db={db}
        />

        <Swirly />

        <span className="w-100vw lg:w-1/2 text-center p-10 mt-10 text-xl">
          Join us as we go into the woods to celebrate the union of Shakoora and
          Nabeel. Guests are asked to avoid wearing blue, purple, yellow, red,
          or orange colors. Indoor reception to follow.
        </span>

        <DetailsRow
          host="The Sabree and Al-Khattab Families"
          date={{
            day: "Sunday, September 29 2024",
            time: "2:30PM EDT"
          }}
          address={{
            location: "Into the Woods",
            street: "432 S P County Rd 850 E",
            city: "Greensburg, IN 47240"
          }}
        />
      </div>
      <Footer />
      <Toaster />
    </main>
  );
}
