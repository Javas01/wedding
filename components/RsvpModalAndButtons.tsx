import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RsvpForm } from "./RsvpForm";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { useToast } from "./ui/use-toast";

export const RsvpModalAndButtons = ({
  guestName,
  guestEmail,
  submitted,
  setSubmitted,
  db
}: {
  guestName: string;
  guestEmail: string;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  db: any;
}) => {
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
    msg: z.string().max(500),
    ...(willAttend
      ? {
          meal: z
            .string()
            .min(1, "You must select an option")
            .refine(
              (value) => ["chicken", "fish", "vegetarian"].includes(value),
              {
                message: "Invalid option selected"
              }
            )
        }
      : {
          meal: z.string().optional()
        })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: guestName,
      email: guestEmail,
      msg: "",
      meal: ""
    },
    values: {
      name: guestName,
      email: guestEmail,
      msg: "",
      meal: ""
    }
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    const hasGuests = numOfGuests[0] > 1;
    const data = {
      ...values,
      willAttend,
      ...(willAttend
        ? {
            numOfGuests: numOfGuests[0]
          }
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
        (hasGuests ? " and " + (numOfGuests[0] - 1) + " more" : ""),
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
              width: "150px",
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)"
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
              width: "150px",
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)"
            }}
            onClick={() => setWillAttend(false)}
            disabled={submitted}
          >
            REGRET TO MISS
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-full overflow-y-scroll max-h-screen">
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
                form.setValue("meal", "");
              }}
            >
              <span className={!willAttend ? "text-blue font-semibold" : ""}>
                REGRET TO MISS
              </span>
            </Toggle>
          </div>
        </DialogHeader>
        <RsvpForm
          form={form}
          onSubmit={onSubmit}
          willAttend={willAttend}
          numOfGuests={numOfGuests}
          setNumOfGuests={setNumOfGuests}
        />
      </DialogContent>
    </Dialog>
  );
};
