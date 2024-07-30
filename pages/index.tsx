import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { Toaster } from "@/components/ui/toaster";
import { Swirly } from "@/components/svg";
import { DetailsRow } from "@/components/DetailsRow";
import { RsvpModalAndButtons } from "@/components/RsvpModalAndButtons";
import Footer from "@/components/Footer";
import { Great_Vibes, Dancing_Script } from "next/font/google";
import TreesBackground from "../public/assets/trees_five.jpg";
import { ContactFab } from "@/components/Fab";
import Head from "next/head";
import { RegistryFab } from "@/components/Registry";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const guestName =
      new URLSearchParams(window.location.search).get("name") ?? "";
    const guestEmail =
      new URLSearchParams(window.location.search).get("email") ?? "";
    setGuest({ name: guestName, email: guestEmail });
  }, []);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data === "Image clicked") {
        setOpen(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Into The Woods</title>
        <meta name="description" content="The wedding of Shakoora and Nabeel" />
        <meta
          name="keywords"
          content="intothewoods, Shakoora, Nabeel, Shakoora Sabree, wedding, Shakoora wedding, Shakoora and Nabeel wedding"
        />
        <meta name="author" content="Unhired.dev" />
        <meta property="og:title" content="Into The Woods" />
        <meta
          property="og:description"
          content="The wedding of Shakoora and Nabeel"
        />
        <meta property="og:url" content="https://intothewoods.wedding" />
        <link rel="canonical" href="https://intothewoods.wedding" />
      </Head>
      <main
        style={{
          height: "100vh",
          overflow: "scroll"
        }}
        className="text-xl"
      >
        <div
          style={{
            backgroundImage: `url(${TreesBackground.src})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom center",
            backgroundAttachment: "scroll",
            height: "100vh",
            position: "absolute",
            overflow: "scroll",
            width: "100vw",
            zIndex: -1
          }}
        />
        <iframe
          scrolling="no"
          src="assets/invitation.html"
          className="w-full h-1/2 lg:h-4/5"
          style={{
            overflow: "hidden"
          }}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              display: "flex",
              justifyContent: "center"
            }}
            // @ts-ignore
            hideClose={true}
          >
            <img
              className="w-[95vw]"
              src="/assets/SHAKwedding_five.jpeg"
              alt="invitation"
            />
          </DialogContent>
        </Dialog>
        <div className="flex justify-center items-center flex-col">
          <span
            style={vibez.style}
            className="p-10 text-7xl  w-100vw text-wrap text-center"
          >
            The Wedding of Shakoora & Nabeel
          </span>

          <span className="text-center font-normal">To: {guest.name}</span>

          <RsvpModalAndButtons
            guestName={guest.name}
            guestEmail={guest.email}
            submitted={submittedRsvp}
            setSubmitted={setSubmittedRsvp}
            db={db}
          />

          <Swirly />

          <div
            className="m-5 w-8/12"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span
              style={{ fontFamily: "cursive" }}
              className="w-full lg:w-3/4 text-center p-10 pl-10 pr-10 mt-10 text-2xl"
            >
              <span className="pr-1 text-4xl" style={vibez.style}>
                Together,
              </span>{" "}
              with their families, Shakoora and Nabeel invite you to join them
              as they go into the woods to celebrate their union. Guests are
              invited to wear <span className="text-[#6C6B5F]">sage green</span>
              , <span className="text-[#D4A6A1]">dusty pink</span>, and/or{" "}
              <span className="text-[#D2B48C]">beige </span>
              colored clothing. Indoor reception to follow.
            </span>

            <DetailsRow
              host={{
                lineOne: "The Sabree",
                lineTwo: "and Al-Khattab",
                lineThree: "Families"
              }}
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
        </div>
        <RegistryFab />
        <ContactFab />
        <Footer />
        <Toaster />
      </main>
    </>
  );
}
