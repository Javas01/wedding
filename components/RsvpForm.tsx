import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

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
  );
};
