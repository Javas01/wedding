import { Dancing_Script } from "next/font/google";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@radix-ui/react-label";
const dancing = Dancing_Script({
  subsets: ["latin"],
  display: "swap"
});
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtVQ-bC-jSwGFuhytvfPnjEL_ZqNibsio",
  authDomain: "wedding-93e05.firebaseapp.com",
  projectId: "wedding-93e05",
  storageBucket: "wedding-93e05.appspot.com",
  messagingSenderId: "999042266591",
  appId: "1:999042266591:web:66d3e90d4459780586806a",
  measurementId: "G-EB0N99KNGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [guest, setGuest] = useState({
    name: "",
    email: ""
  });
  const [submittedRsvp, setSubmittedRsvp] = useState(false);

  useEffect(() => {
    const analytics = getAnalytics(app);
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
          style={{
            fontFamily: '"Brush Script MT", cursive'
          }}
          className="p-10 text-7xl  w-1/2 text-center"
        >
          The Wedding of Shakoora & Nabeel
        </span>

        <>
          <span>TO:</span>
          <span>{guest.name.toUpperCase()}</span>
        </>

        <DialogDemo
          guestName={guest.name}
          guestEmail={guest.email}
          submitted={submittedRsvp}
          setSubmitted={setSubmittedRsvp}
        />

        <SvgComponent />

        <span className="w-1/2 text-center p-10 mt-10 text-xl">
          Join us as we go into the woods to celebrate the union of Shakoora and
          Nabeel. Guests are asked to avoid wearing blue, purple, yellow, red,
          or orange colors. Indoor reception to follow.
        </span>

        <div className="flex space-x-3 flex-row w-3/4 justify-evenly pb-48 pt-10">
          <div className="flex flex-col  items-center">
            <span className="pb-10 text-4xl" style={dancing.style}>
              Host
            </span>
            <Dot />
            <span className="pt-10">The Sabree and Al-Khattab Families</span>
          </div>
          <div className="flex flex-col  items-center">
            <span className="pb-10 text-4xl" style={dancing.style}>
              Date
            </span>
            <Dot />
            <span
              className="pt-10"
              style={{
                textDecoration: "underline",
                textDecorationColor: "rgb(41, 100, 195)",
                cursor: "pointer"
              }}
              onClick={() => {
                open(
                  "https://www.google.com/calendar/render?action=TEMPLATE&text=Shakoora%20%26%20Nabeel%20Wedding&dates=20240929T183000Z/20240929T203000Z&details=Wedding%20of%20Shakoora%20%26%20Nabeel%20at%20Into%20the%20Woods%20in%20Greensburg%2C%20IN%2047240&location=432%20S%20P%20County%20Rd%20850%20E%2C%20Greensburg%2C%20IN%2047240&sf=true&output=xml"
                );
              }}
            >
              Sunday, September 29 2024
            </span>
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "rgb(41, 100, 195)",
                cursor: "pointer"
              }}
              onClick={() => {
                open(
                  "https://www.google.com/calendar/render?action=TEMPLATE&text=Shakoora%20%26%20Nabeel%20Wedding&dates=20240929T183000Z/20240929T203000Z&details=Wedding%20of%20Shakoora%20%26%20Nabeel%20at%20Into%20the%20Woods%20in%20Greensburg%2C%20IN%2047240&location=432%20S%20P%20County%20Rd%20850%20E%2C%20Greensburg%2C%20IN%2047240&sf=true&output=xml"
                );
              }}
            >
              2:30PM EDT
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="pb-10 text-4xl" style={dancing.style}>
              Address
            </span>
            <Dot />
            <span className="pt-10">Into the Woods</span>
            <span>432 S P County Rd 850 E</span>
            <span>Greensburg, IN 47240</span>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

export function DialogDemo({
  guestName,
  guestEmail,
  submitted,
  setSubmitted
}: {
  guestName: string;
  guestEmail: string;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
}) {
  const [willAttend, setWillAttend] = useState(true);
  const [numOfGuests, setNumOfGuests] = useState([1]);
  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters."
      })
      .max(50),
    email: z.string().email({
      message: "Invalid email."
    }),
    msg: z.string().max(500)
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: guestName,
      email: guestEmail,
      msg: ""
    },
    values: {
      name: guestName,
      email: guestEmail,
      msg: ""
    }
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    const hasGuests = numOfGuests[0] > 1;
    const data = {
      ...values,
      willAttend,
      ...(willAttend
        ? numOfGuests
        : {
            numOfGuests: 0
          })
    };
    setOpen(false);
    form.reset();
    setSubmitted(true);

    await setDoc(doc(db, "responses", data.email), data);

    toast({
      title:
        "RSVP Submitted for " +
        values.name +
        (hasGuests ? " and " + numOfGuests[0] + " more" : ""),
      description: willAttend ? "See you there!" : "We'll miss you!"
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-center space-x-2 flex-row p-10 w-1/2">
        <DialogTrigger asChild value={1}>
          <Button
            size="lg"
            variant="outline"
            style={{
              width: "150px"
            }}
            onClick={() => setWillAttend(true)}
            disabled={submitted}
          >
            WILL ATTEND
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild value={0}>
          <Button
            size="lg"
            variant="outline"
            style={{
              width: "150px"
            }}
            onClick={() => setWillAttend(false)}
            disabled={submitted}
          >
            WILL NOT
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Will you make it, {guestName}?
          </DialogTitle>

          <div className="flex flex-row justify-evenly pt-3">
            <Toggle
              size={"lg"}
              variant="outline"
              pressed={willAttend}
              style={{
                width: "150px",
                backgroundColor: willAttend ? "rgba(41, 100, 195,0.2)" : "",
                opacity: !willAttend ? 0.5 : 1,
                border: willAttend ? "3px solid rgba(41, 100, 195,0.2)" : ""
              }}
              onClick={() => setWillAttend(true)}
            >
              <span className={willAttend ? "text-blue font-semibold" : ""}>
                WILL ATTEND
              </span>
            </Toggle>
            <Toggle
              size={"lg"}
              variant="outline"
              pressed={!willAttend}
              style={{
                width: "150px",
                backgroundColor: !willAttend ? "rgba(41, 100, 195,0.2)" : "",
                opacity: willAttend ? 0.5 : 1,
                border: !willAttend ? "3px solid rgba(41, 100, 195,0.2)" : ""
              }}
              onClick={() => {
                setWillAttend(false);
                setNumOfGuests([1]);
              }}
            >
              <span className={!willAttend ? "text-blue font-semibold" : ""}>
                WILL NOT
              </span>
            </Toggle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-right">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Guest Name"
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="guest@email.com"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label>
                  Guests - {numOfGuests[0] === 10 ? "10 or more" : numOfGuests}
                </Label>
                <Slider
                  className="pt-5"
                  defaultValue={[1]}
                  value={numOfGuests}
                  disabled={!willAttend}
                  onValueChange={(value) => setNumOfGuests(value)}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>

              <FormField
                control={form.control}
                name="msg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="text" className="text-right">
                      Leave a message for the couple
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your message here"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Submit RSVP</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const SvgComponent = () => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 262.8 37.9"
    style={{
      width: "150px"
    }}
    xmlSpace="preserve"
    fill="#85A3D9"
  >
    <style type="text/css">
      {`.st0{fill-rule:evenodd;clip-rule:evenodd;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}`}
    </style>
    <path
      d="M262.3,12.2l0.4-0.8l-1.7,1.8c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.1,0.1-0.2,0.2l0-0.1l-0.5,0.4c-1.5,1.3-2.8,1.9-4.6,2.9
	l-0.7,0.3l0.1,0.1c-0.8,0.4-1.6,0.8-2.3,1c0,0-0.1,0-0.1,0l-0.1-0.1l-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.3,0.1
	l-0.1-0.1c-0.5,0.3-2,0.7-3,0.9l-0.8,0.1c-0.8,0.1-1.1,0.2-1.1,0.3c-0.4,0.1-0.4,0-0.5,0c-0.2-0.1-0.3-0.1-0.9-0.1
	c-1.2,0.2-5.3,0.8-8,0.7c-1.4,0.1-2.9,0.1-4.2,0.1c-0.5,0-0.9,0-1.4,0c-0.3,0-0.4,0-0.5,0c0,0-0.1-0.1-0.2-0.1l0-0.4
	c-0.4,0-0.7,0-0.9,0c-0.2,0-0.3,0-0.5-0.1c-0.2,0-0.5-0.1-0.7-0.1l-0.3-0.1c-0.1,0-0.2-0.1-0.3-0.1l-0.2,0l0,0c0,0-0.1,0-0.1,0
	c-0.4,0-0.6,0.1-0.6,0.4c0,0,0,0,0,0c-1.6-0.2-3.8-0.5-6-0.9c-0.1-0.2-0.4-0.2-0.7-0.3c0-0.2-0.2-0.3-0.6-0.3l0.1,0l-1.3-0.3
	c-0.6-0.1-1.1-0.2-1.7-0.3c-0.7-0.1-1.6-0.3-3-0.6l-0.3-0.1l-0.1,0.2c0,0,0,0,0,0c-0.4-0.1-0.7-0.1-1-0.2l0.3,0l-2.7-1.1l0.3,0
	l-4.8-0.9l-0.1,0.2v0c-0.3-0.1-0.8-0.2-1.3-0.3c-0.1,0-0.2,0-0.3,0c-0.1-0.1-0.3-0.2-0.5-0.3l0-0.2c-1.1-0.3-1.4-0.3-1.8-0.3
	c-0.2,0-0.3,0-0.6-0.1c-0.1,0-0.4-0.1-0.7-0.1l0,0.2c-0.8-0.1-1.1-0.2-1.4-0.4c-0.4-0.2-0.8-0.4-2.1-0.6l-2-0.3l0.7,0.4
	c-0.7,0-1.1,0-1.2,0.2c-0.2,0-0.4,0-0.6-0.1l0.1-0.4c-0.6-0.1-1.4-0.3-2.1-0.4c-0.5-0.1-1-0.2-1.3-0.3c-0.4,0-0.7,0-0.8,0.1
	c-0.2-0.1-0.6-0.2-1.5-0.2l0,0.2c-0.3,0-0.6,0-0.9,0c-0.4,0-0.7-0.1-1-0.1l0-0.3c-0.1,0-0.3,0-0.4,0c-0.2,0-0.2,0-0.3,0
	c-0.2,0-0.3-0.1-0.9,0c-0.1,0-0.3,0.1-0.5,0.1c-0.3,0.1-0.6,0.1-0.8,0.2c-0.1,0-0.3,0-0.4,0l0-0.2c-0.8,0-0.9,0-1-0.1
	c-0.2-0.1-0.4-0.1-1.5-0.1l-0.4,0.1c-0.1,0-0.2,0-0.2,0l0-0.1c0,0-0.1,0-0.2,0c-0.2,0-0.7,0.1-1,0.1c-0.2,0-0.4,0-0.6,0l-0.1-0.1
	l-0.1,0c-0.2,0-0.5,0.1-0.8,0.1c-0.6,0.1-1.3,0.2-2,0.1l0,0.1c-0.4,0-0.8,0.1-1.5,0.2c-0.3,0-0.6,0.1-0.8,0.1c-0.4,0-0.8,0-1.1,0
	l-0.3,0l-0.1,0l-0.3,0.1c-0.3-0.1-0.7,0-1.3,0.1l-0.1-0.1c0-0.2-0.1-0.5-0.1-0.7l0.2-0.1c-0.3-1-0.6-1.2-0.8-1.3l-0.1,0
	c0,0-0.1-0.1-0.2-0.2c0,0,0,0-0.1-0.1c0-0.2-0.2-0.4-0.4-0.6l-0.1-0.1c-0.1-0.1-0.2-0.2-0.3-0.2l0-0.1l-0.2-0.1
	c-0.1-0.1-0.2-0.1-0.3-0.2c-0.2-0.1-0.4-0.2-0.9-0.4c-0.3-0.2-0.7-0.3-1.1-0.5l0.8-0.1l-2.3-0.4c-0.7-0.1-1.5-0.2-2-0.3l0,0.1
	c-0.6-0.1-1-0.1-1.2-0.1c-0.1,0-0.3-0.1-0.4-0.1l-0.5-0.1l-0.1,0c-0.2,0-0.8,0-1.3,0c-0.3,0-0.6,0-0.9,0c-0.1-0.2-0.5-0.3-1.6-0.3
	l-1.3,0.1l0.1-0.1l-1.3,0c-1.6,0.1-2.4,0.2-3.1,0.4c-0.4,0.1-0.9,0.2-1.5,0.2c-0.1-0.2-0.5-0.1-1.6-0.1l-0.1,0L146.4,8
	c0,0-0.1,0-0.4,0.1l-0.7,0.1c-1.6,0-3.9,0.4-6.2,0.7c-1.1,0.2-2.3,0.3-3.3,0.4l-1.2,0.1l0.2,0.1c0,0-0.1,0-0.1,0
	c-0.3,0.1-0.7,0.1-0.9,0.2c-0.2-0.1-0.6,0-1.3,0.2c-0.2,0-0.4,0.1-0.6,0.1c0,0,0-0.1,0-0.2c0-0.3,0.1-0.6,0.1-1
	c0-0.2,0.1-0.5,0.1-0.7c0-0.1,0-0.2,0-0.2l0-0.1l0-0.4l0,0c-0.1-0.4-0.2-1-0.4-1.5c-0.3-0.7-0.7-1.3-1-1.6c-0.1-0.2-0.5-0.7-1.3-1.4
	c-3.6-2.4-8-2.8-11.9-3c-1.5-0.1-2.9,0-4.4,0.1c-0.6,0-1.2,0.1-1.8,0.1c-1.4,0.1-2.8,0.3-4.1,0.5c-0.1,0-0.3,0-0.4,0.1
	c-0.1-0.1-0.2-0.2-0.4-0.2l-0.6,0l0.1,0.2c-0.1,0-0.2,0-0.4,0.1c-0.6,0.1-1.6,0.2-2.8,0.5l-0.1,0l0,0c-0.5,0.1-0.8,0.2-1.2,0.2
	c-0.4,0.1-0.9,0.1-1.5,0.3l-0.6,0.2c-0.3,0.1-0.6,0.1-0.9,0.1c-0.7,0.1-1.3,0.2-1.7,0.4l-0.8,0.1l-0.1,0c-0.5,0.2-1,0.3-1.5,0.4
	c-0.4,0.1-0.9,0.2-1.4,0.3l-0.1,0c-1,0.2-2.1,0.5-2.9,0.8c-0.7,0.2-1.4,0.4-1.8,0.5l-0.2,0.1c-1.8,0.5-2.9,0.8-3.3,1l-0.1-0.1
	l-1.2,0.4c-5.4,1.6-11.5,3.3-16.3,5l0-0.1c-1.4,0.5-2.9,0.9-4.3,1.3c-1.8,0.5-3.5,1-4.9,1.6L57,14.3c-0.4,0.1-0.6,0.1-0.7,0.1
	c-0.2,0-0.3,0-0.7,0.1c-0.3,0.1-0.9,0.3-1.6,0.5c-0.6,0.2-1,0.3-1.3,0.4l0,0l-0.3,0.1c-0.8,0.2-1.5,0.5-2.3,0.8
	c-0.7,0.2-1.3,0.5-1.9,0.6l0-0.1c-8,2.1-17.8,4.7-23.6,6.1c-0.7,0.2-0.9,0.2-0.9,0.2c-0.2-0.1-0.4-0.1-0.7,0
	c-3.3,0.8-6.9,1.2-10.4,1.3c-4.3,0-7.4-0.8-9.3-2.6c-1.5-1.5-1.9-3-2.1-4l-0.1-0.3C1,17.3,1,17,0.9,16.8c0-0.1,0-0.2-0.1-0.3L0,12.8
	l0.1,3.5c0,1.7,0.4,3.2,1.1,4.6c0.7,1.4,1.9,2.5,3.3,3.3c1.2,0.7,2.6,1.1,4.2,1.4c1.5,0.2,2.9,0.3,4.2,0.3c5.2,0,10.2-1,15.4-2.1
	l1.1-0.2c2.3-0.5,4.9-1.3,7.4-1.9c1.7-0.4,3.2-0.9,4.6-1.2l43-12.6l0-0.1c0.2-0.1,0.4-0.2,0.7-0.3l1.1-0.3l0,0.1c1-0.3,2-0.5,3-0.8
	c1.8-0.5,3.6-1,5.4-1.3l4.1-1l4.2-0.8l0.1-0.1c0.2-0.1,1.1-0.3,1.7-0.4c0.6-0.1,0.9-0.2,1.1-0.2l0,0c0.7-0.1,1.2-0.2,1.7-0.3
	c2.5-0.4,3.1-0.5,6.2-0.4c4.2-0.2,8,0.1,11.2,1.1c2,0.6,3.4,1.4,4.3,2.4c1,1.1,1.3,2.5,0.9,4.1c-0.1,0.3-0.2,0.7-0.3,1
	c-0.3,0.1-0.6,0.2-0.9,0.2c-0.4,0.1-0.7,0.2-1.1,0.3l0-0.2c-0.9,0.1-1.9,0.3-3,0.6c-0.9,0.2-1.8,0.5-2.4,0.5l-0.1,0l-0.3,0.3
	c-0.1,0-0.3,0.1-0.6,0.2c-0.5,0.1-1.2,0.2-1.8,0.3c-0.5,0.1-1.2,0.2-1.3,0.2l0,0.3l-0.1-0.3c-0.2,0.1-0.4,0.1-0.6,0.2
	c-0.2,0.1-0.4,0.1-0.6,0.2l0-0.1c-1.4,0.3-2.6,0.7-3.8,1l-0.3,0.1c-0.6,0.1-1.9,0.4-3.3,0.8c-0.7,0.2-1.4,0.4-2.1,0.5
	c-0.6,0.3-1.2,0.5-1.9,0.7c-0.6,0.2-1.3,0.4-1.9,0.6c-0.1,0-0.2,0.1-0.4,0.1c-0.1,0-0.3,0.1-0.4,0.1c-0.2-0.1-0.6,0-1.8,0.4
	c-0.4,0.1-0.8,0.3-1,0.3l0,0.1l0,0c-0.1,0-0.2,0.1-0.3,0.1c-0.4,0.1-0.7,0.2-0.9,0.3l-0.9,0.3c-0.7,0.3-0.8,0.3-0.9,0.4
	c-0.1,0-0.1,0.1-1.1,0.4l0-0.1c-0.9,0.2-1.8,0.6-2.6,0.9c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.2,0.1-0.4,0.1l0.2-0.2l-1.7,0.6
	c-0.2,0.1-1.7,0.6-2.3,1.1l0,0c-2.4,0.8-6.1,2.6-8,3.6c-0.1,0-0.2,0.1-0.3,0.2c-0.4,0.2-0.8,0.4-1.1,0.6c-0.2,0.1-0.5,0.3-0.6,0.4
	l-0.1,0l-0.1,0.1c-0.3,0.2-0.5,0.3-0.7,0.4c-0.3,0.1-0.6,0.3-1.2,0.7l-0.2,0l-0.1,0.3c-1.1,0.7-2.1,1.5-2.9,2.4
	c-0.4,0.5-1,1.2-1.3,2.1c-0.1,0.3-0.1,0.6-0.2,0.9l-0.1,0.1c-0.2,0.2-0.1,0.4,0,0.7c0.1,0.6,0.4,1.2,0.8,1.6c0.4,0.5,1,0.8,1.7,1.1
	c0.9,0.4,1.9,0.5,2.7,0.5l0,0.1c0.5,0,1,0.1,1.5,0l-0.4,0.2l2.5-0.3c0.2,0,0.4,0,0.5-0.1l0-0.1c0.3,0,0.6,0,0.9-0.1l0,0l0.1,0
	c0.9-0.1,1.3-0.1,1.7-0.2c0.2,0,0.4-0.1,0.6-0.1l0.3,0.1c0.8,0.2,3.9-0.4,3.9-0.4l0.3-0.1c0.3-0.1,0.5-0.1,0.6-0.2
	c0.5-0.1,0.6-0.1,0.6-0.1c0.1,0,0.3,0,0.7-0.1c1-0.3,2-0.7,3-1c0.1,0,0.1,0,0.2,0l0,0.2c1.9-0.5,3.1-1,4.3-1.5
	c0.3-0.1,0.6-0.2,0.8-0.3c0.5-0.1,1.5-0.5,2.4-0.9l0.8-0.2c0.1,0.1,0.3,0.1,0.4,0.1l0.1,0.1c0.3-0.1,0.7-0.3,1.2-0.5
	c1.4-0.6,3.4-1.4,4.8-2l0-0.1c0.2-0.1,0.5-0.3,0.8-0.4c1-0.5,1.4-0.7,1.6-0.9c0.9-0.4,1.1-0.5,1.1-0.5c0.2,0,0.3,0,0.6-0.2l0.2-0.1
	c2-1.1,3.9-2.2,5.7-3.4l0,0c1.4-1,3.9-2.8,5.4-4.2l0.1,0.1c0.8-0.7,0.9-0.9,1-1c0-0.1,0.1-0.2,0.6-0.7l0.1,0.1
	c0.2-0.3,0.5-0.5,0.7-0.8c0.7-0.7,1.4-1.4,2.1-2.4l0.1,0c0.9-1.2,1.5-2.3,2-3.4c0.9-0.1,1.7-0.3,2.3-0.4c0.2,0,0.5,0,1.1-0.1
	c0.4-0.1,0.8-0.1,1.1-0.1c1.1-0.4,2.8-0.6,4.5-0.8c0.8-0.1,1.5-0.2,2.3-0.3l1.1-0.1c4.3-0.5,8.1-0.9,11.8-1c2.2-0.1,4.1-0.1,5.9,0.2
	c2.3,0.3,4,0.8,5.2,1.6c0.7,0.5,1.2,1.1,1.3,1.8c0,0,0,0,0,0l0,0.2c-0.1,0-0.4,0.1-0.7,0.2c-0.2,0-0.3,0.1-0.4,0.1
	c-0.1-0.1-0.2-0.2-0.4-0.2l-0.1,0l-0.1,0c-0.4,0.1-0.9,0.2-1.3,0.2c-0.6,0.1-1.1,0.1-1.5,0.3l-0.6,0.3c0,0,0,0-0.1,0
	c-0.2-0.1-0.4-0.1-0.7,0c-0.8,0.2-1.1,0.3-1.3,0.5c-0.2,0.1-0.5,0.1-0.7,0.2c-0.1-0.1-0.2-0.1-0.4-0.1c-1.3,0.3-1.6,0.4-1.9,0.6
	c-0.2,0.1-0.4,0.2-1.2,0.4c-0.1-0.3-0.5-0.2-0.7-0.2l-0.4,0.1c-0.2-0.1-0.4-0.1-0.5-0.1h-0.1l-0.1,0.1c-0.2,0.1-1.2,0.4-1.7,0.5
	c-0.7,0.2-0.9,0.2-1,0.3l-2.6,0.7c-0.3,0.1-0.4,0.1-0.5,0.2l-0.8,0.3c-4.2,1.3-10,3.6-13.5,6.1c-0.8,0.3-2.1,1-3.8,2.4
	c-0.1,0-0.2,0.1-0.3,0.2l0.1,0.1c-0.1,0.1-0.3,0.3-0.4,0.4l-0.2,0.2c-0.3,0.2-0.5,0.4-0.8,0.7c-0.7,0.8-1.1,1.6-1.3,2.5
	c-0.1,0.6-0.1,1.1,0.2,1.7c0.3,0.6,0.7,1,1,1.2l0.1,0.1c0.1,0.1,0.2,0.2,0.2,0.2l0.1,0.1c0.7,0.4,1.1,0.5,1.4,0.5c0.1,0,0.3,0,0.4,0
	c0.1,0,0.2,0,0.2,0c0.3,0.1,0.6,0.1,0.9,0.2l0.1,0l0.2-0.1l0.6,0c0.4,0,0.9,0,1.3,0l-0.2,0.2l1-0.1c0.3,0,0.6-0.1,0.7-0.1
	c1.5-0.1,4.5-0.5,6.5-1l-0.1-0.2c0.1,0,0.2,0,0.2-0.1l0,0.2c3.5-0.5,8-2.4,10.4-3.4c0.5-0.2,0.5-0.3,0.6-0.4c0,0,0.1-0.1,0.1-0.1
	c2.3-0.9,5-2.6,6.9-3.8l-0.1-0.2l0,0c0.1-0.1,0.4-0.4,1.3-1.1c0.5-0.5,0.6-0.5,0.7-0.5c0.2,0,0.5-0.1,1.1-0.5l0.8-0.8l-0.1,0.4
	l3.2-3.7l0,0l0.2-0.2c0.5-0.6,1-1.3,1.4-2.2c0-0.1,0.1-0.2,0.1-0.4c0.1-0.3,0.2-0.6,0.3-0.9h0c0,0,0-0.1,0-0.1c0,0,0,0,0-0.1
	l1.3-0.2c1.6-0.1,4.1-0.3,5.8-0.4l0.3,0c1-0.1,1.8-0.1,2.4-0.2c0.8-0.1,1.4-0.1,2.2-0.2c0.6,0,1.1,0.1,1.4,0.1l0.3,0
	c1.5,0,3,0.1,4.4,0.2c1.2,0.1,2.3,0.2,3.4,0.2l0.1,0.1l0.2,0c2.2,0.1,5.5,0.4,8.1,1c0.3,0,0.9,0.1,1.4,0.2c0.7,0.1,1,0.1,1.2,0.1
	c0.1,0,0.1,0,0.2,0.1l0,0.2c2.2,0.5,4.3,1,6.4,1.4c3.2,0.7,6.2,1.4,9.5,2c1.5,0.5,4.9,1,7.9,1.4l0.6,0.1c0.4,0,0.8,0.1,1.2,0.1
	c1.8,0.2,3.9,0.4,5.2,0.2l0.1,0.1l0.2,0c1.8,0.1,5.4,0.1,9.2-0.2c1.2-0.1,1.7-0.2,2.2-0.4c0.3-0.1,0.6-0.2,1.1-0.2l0.1,0.1l0.2,0
	c1.2-0.3,1.8-0.5,2.2-0.7l0.1,0.3c1.2-0.2,2.4-0.6,3.4-1c0.7-0.2,1.2-0.4,1.7-0.5c1.3-0.4,2.5-1,2.9-1.3c0,0,0.1,0,0.2-0.1l0,0.1
	c1.2-0.6,1.9-1,2.5-1.5c0.2-0.1,0.3-0.2,0.3-0.3l0.1-0.2c0.1-0.1,0.2-0.2,0.3-0.4c0,0,0.1-0.1,0.1-0.1c0.2,0.2,0.5,0,0.7-0.2
	c0.5-0.5,1-0.9,1.3-1.3c0.3-0.3,0.6-0.6,0.8-0.9c0.2-0.2,0.3-0.4,0.4-0.5L262.3,12.2z M161.2,22.2c-1.5,1.3-4,2.8-7.3,4.4
	c-0.1,0.1-0.3,0.2-0.4,0.3c-0.2,0.1-0.3,0.2-0.4,0.3l0,0c-3,1.3-7.2,3-10.5,3.7l0,0.1c-0.1,0-0.1,0-0.2,0.1l-2.5,0.4l0,0l-0.8,0.1
	l0,0c0,0-0.1,0-0.1,0c-1.1,0.2-1.9,0.3-2.9,0.4c-1.1,0.1-2.3,0.2-3.9,0.1c-0.6,0-1-0.1-1.4-0.2c-0.3-0.1-0.7-0.2-0.8-0.5
	c0-0.2,0-0.7,0.4-1.4c0.4-0.7,1-1.4,1.6-1.9l1.6-1.2l0.6-0.4c4.2-2.9,11.2-5.5,17.5-7.6l0.4,0l0.1,0c5.4-1.7,10.8-2.7,15-3.3
	c-0.1,0.2-0.2,0.4-0.3,0.6c-1.1,2-3.1,3.8-4.6,5.2c-0.3,0.3-0.4,0.4-0.4,0.5c0,0-0.1,0.1-0.2,0.1c0,0-0.1,0-0.1,0.1
	C161.5,22,161.4,22.1,161.2,22.2z M85.9,25.2c0,0,0.1-0.1,0.2-0.1c0.2-0.1,0.4-0.2,0.5-0.4c0.4-0.2,0.8-0.3,1.2-0.4
	c0.5-0.1,1-0.3,1.7-0.6l0,0l0.3-0.2l0,0c0.7-0.3,1.1-0.5,1.4-0.6c0.2,0.1,0.8,0,2.8-0.7c7.2-2.6,14-4.7,20.4-6.3c0,0,0.1,0,0.2,0
	l0-0.1c0,0,0,0,0,0c0.5,0,1.1-0.2,1.8-0.4c0.2-0.1,0.5-0.1,0.7-0.2l0,0.1c1.2-0.3,2.4-0.5,3.5-0.8c1.5-0.3,2.9-0.7,4.4-1l0,0
	c0.2,0,0.4-0.1,0.6-0.2l0.1,0l0,0c1-0.3,2.1-0.5,3-0.6c-1,1.7-2.5,3.5-4.6,5.5c-2.5,2.3-5.5,4.4-9.1,6.6c-6.7,3.9-13.8,6.9-21.3,8.8
	c-4.1,1-7.9,1.7-11.5,1.9c-0.8,0.1-1.7,0.1-2.9,0.1c-1,0-1.9,0-2.7-0.2c-0.9-0.2-1.6-0.5-2-0.9c-0.4-0.4-0.5-0.9-0.2-1.5
	c0.2-0.7,0.9-1.7,2.2-2.7c0.7-0.5,1.4-1,2.1-1.5l1.4-0.9c1.7-1,2.4-1.3,4.3-2.1L85.9,25.2L85.9,25.2z M84.7,6.1L84.7,6.1L84.7,6
	C84.7,6,84.7,6.1,84.7,6.1z M77.2,28.1L77.2,28.1L77.1,28C77.1,28,77.2,28,77.2,28.1z M169.2,15.1L169.2,15.1L169.2,15.1L169.2,15.1
	z"
    ></path>
  </svg>
);
const Dot = () => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 10.5 10.5"
    xmlSpace="preserve"
    fill="rgb(41, 100, 195)"
    width={8}
  >
    <circle cx="5.2" cy="5.2" r="5.2" />
  </svg>
);
