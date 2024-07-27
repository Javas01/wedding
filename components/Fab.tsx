import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const ContactFab = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="fixed bottom-5 right-5 z-5 rounded-full bg-[#1F2937]">
          ?
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 bg-[#1F2937]">
        <div className="grid gap-4 text-white ">
          <span className="text-xl">Questions? Contact us</span>{" "}
          <a
            style={{
              color: "#FFD700"
            }}
            href="mailto:djsabree@yahoo.com"
          >
            djsabree@yahoo.com
          </a>{" "}
          <a
            style={{
              color: "#FFD700"
            }}
            href="mailto:halima.alkhattab@gmail.com"
          >
            halima.alkhattab@gmail.com
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};
