import React from "react";
import { Dot } from "./svg";
import { Dancing_Script } from "next/font/google";
import { Spacer } from "@/components/Spacer";

const dancing = Dancing_Script({
  subsets: ["latin"],
  display: "swap"
});

export const DetailsRow = ({
  host,
  date,
  address
}: {
  host: string;
  date: { day: string; time: string };
  address: { location: string; street: string; city: string };
}) => {
  return (
    <div className="flex space-x-3 flex-col w-3/4 justify-evenly pb-32 pt-10 lg:flex-row text-center">
      <div className="flex flex-col  items-center">
        <span className="pb-10 text-4xl" style={dancing.style}>
          Host
        </span>
        <Dot />
        <span className="pt-10">{host}</span>
      </div>

      <Spacer />

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
          {date.day}
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
          {date.time}
        </span>
      </div>

      <Spacer />

      <div className="flex flex-col items-center">
        <span className="pb-10 text-4xl" style={dancing.style}>
          Address
        </span>
        <Dot />
        <span className="pt-10">{address.location}</span>
        <span>{address.street}</span>
        <span>{address.city}</span>
      </div>
    </div>
  );
};
