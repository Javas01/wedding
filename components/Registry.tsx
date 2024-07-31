import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

export const RegistryFab = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="fixed bottom-5 left-5 z-5 rounded-full bg-[#1F2937]">
          Registry
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-62 h-62 max-h-[80vh] max-w-[100vw] lg:max-w-[30vw] text-white overflow-y-scroll text-wrap bg-[#1F2937]">
        <p className="text-wrap text-justify">
          With the blessings of the Creator and the support of our families, we,
          Shakoora and Nabeel, are excited to announce our wedding on September
          29, 2024, and warmly invite you to join us on this special day. Your
          presence is the greatest gift we could ask for, but if you wish to
          give further, we would prefer monetary gifts instead of physical ones
          due to our current living situation. Since we already have furnished
          homes, we haven’t set up a registry and will be sorting through our
          combined possessions as we merge households. If you would like to
          contribute in another way, we also appreciate handwritten letters,
          which are treasured keepsakes. An option for electronic donations is
          available for those who wish to contribute, but please know there is
          no obligation. We look forward to celebrating with you, whether in
          person or from afar.
        </p>
        <div className="flex flex-col pt-5 sm:flex-row w-full justify-between">
          <Button
            size="lg"
            variant={null}
            className="w-full sm:w-1/4 bg-[#003087] rounded-full max-sm:mb-5"
            onClick={() => {
              window.open(
                "https://paypal.me/nabeelalkhattab?country.x=US&locale.x=en_US",
                "_blank"
              );
            }}
          >
            <FontAwesomeIcon className="pr-1" icon={faPaypal} size="1x" />
            Paypal
          </Button>
          <Button
            size="lg"
            variant={null}
            className="w-full sm:w-1/4 bg-[#00C852] rounded-full max-sm:mb-5"
            onClick={() => {
              window.open("https://cash.app/$NabeelAl", "_blank");
            }}
          >
            <span className="pr-1 text-xl">$ </span> Cash App
          </Button>
          <Button
            size="lg"
            variant={null}
            className="w-full sm:w-1/4 bg-[#3496CD] rounded-full max-sm:mb-5"
            onClick={() => {
              window.open("https://venmo.com/u/nalkhatt", "_blank");
            }}
          >
            <img src="/assets/venmo-icon.svg" alt="Venmo" className="w-6 h-5" />
            Venmo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
