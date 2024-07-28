import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

export const RsvpForm = ({
  form,
  onSubmit,
  willAttend,
  numOfGuests,
  setNumOfGuests
}: {
  form: any;
  onSubmit: any;
  willAttend: boolean;
  numOfGuests: number[];
  setNumOfGuests: any;
}) => {
  return (
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
            name="diet"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="text" className="text-right">
                  Dietary Restrictions
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={!willAttend}
                    placeholder="Enter your dietary restrictions here"
                    className="col-span-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="flex flex-row justify-between w-full ">
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button">Registry</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <p className="text-center">
                  Instead of a wedding registry, the couple have requested
                  hand-written cards featuring words of wisdom for the newly
                  weds. If you so choose, these can be sent to the couple at
                  11659 Sinclair Dr, Indianapolis, IN 46235. Thank you and G-d
                  bless!
                </p>
              </PopoverContent>
            </Popover>
            <Button type="submit">Submit RSVP</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
