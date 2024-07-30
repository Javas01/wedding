import React from "react";
import { Dot } from "./svg";
import { Dancing_Script } from "next/font/google";
import { Spacer } from "@/components/Spacer";
import { useToast } from "@/components/ui/use-toast";

const dancing = Dancing_Script({
  subsets: ["latin"],
  display: "swap"
});

export const DetailsRow = ({
  host,
  date,
  address
}: {
  host: {
    lineOne: string;
    lineTwo: string;
    lineThree: string;
  };
  date: { day: string; time: string };
  address: { location: string; street: string; city: string };
}) => {
  const { toast } = useToast();
  return (
    <div className="flex space-x-3 flex-col w-full lg:w-11/12 justify-evenly pb-10 lg:pb-14 pt-10 lg:flex-row text-center">
      <div className="flex flex-col  items-center">
        <span className="pb-10 text-4xl underline" style={dancing.style}>
          Host
        </span>
        <Dot />
        <span className="pt-10">{host.lineOne}</span>
        <span>{host.lineTwo}</span>
        <span>{host.lineThree}</span>
      </div>

      <Spacer />

      <div className="flex flex-col  items-center">
        <span className="pb-10 text-4xl underline" style={dancing.style}>
          Date
        </span>
        <Dot />
        <span
          className="pt-10 underline"
          style={{
            textDecorationColor: "rgb(41, 100, 195)",
            cursor: "pointer"
          }}
          onClick={() => {
            open(
              "https://www.google.com/calendar/render?action=TEMPLATE&text=Shakoora%20%26%20Nabeel%20Wedding&dates=20240929T183000Z/20240929T203000Z&details=Wedding%20of%20Shakoora%20%26%20Nabeel%20at%20Into%20the%20Woods%20in%20Greensburg%2C%20IN%2047240&location=432%20S%20P%20County%20Rd%20850%20E%2C%20Greensburg%2C%20IN%2047240&sf=true&output=xml"
            );
          }}
        >
          {date.day}
        </span>
        <span
          className="underline"
          style={{
            textDecorationColor: "rgb(41, 100, 195)",
            cursor: "pointer"
          }}
          onClick={() => {
            open(
              "https://www.google.com/calendar/render?action=TEMPLATE&text=Shakoora%20%26%20Nabeel%20Wedding&dates=20240929T183000Z/20240929T203000Z&details=Wedding%20of%20Shakoora%20%26%20Nabeel%20at%20Into%20the%20Woods%20in%20Greensburg%2C%20IN%2047240&location=432%20S%20P%20County%20Rd%20850%20E%2C%20Greensburg%2C%20IN%2047240&sf=true&output=xml"
            );
          }}
        >
          {date.time}
        </span>
      </div>

      <Spacer />

      <div className="flex flex-col items-center">
        <span className="pb-10 text-4xl underline" style={dancing.style}>
          Address
        </span>
        <Dot />
        <span
          onClick={() => handleCopyAddress(toast)}
          className="pt-10 cursor-pointer"
        >
          {address.location}
        </span>
        <span
          onClick={() => handleCopyAddress(toast)}
          className="text-nowrap cursor-pointer"
        >
          {address.street}
        </span>
        <span
          className="text-nowrap cursor-pointer"
          onClick={() => handleCopyAddress(toast)}
        >
          {address.city}
        </span>
      </div>
    </div>
  );
};

const handleCopyAddress = async (toast: any) => {
  try {
    await navigator.clipboard.writeText(
      `432 S P County Rd 850 E, Greensburg, IN 47240`
    );
    toast({
      title: "Address Copied"
    });
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
