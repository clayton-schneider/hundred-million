"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const roles = [
  { id: "intern", label: "Becoming a 100 Million Intern" },
  { id: "ambassador", label: "Being a 100 Million U.S. Ambassador" },
  {
    id: "campaign",
    label: "Applying to be a part of the National Campaign Group",
  },
  { id: "news", label: "Staying up to date with the work of 100 Million" },
];

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  email: z.string().email(),
  state: z.string(),
  age: z.string(),
  activist: z.string({ required_error: "Please select a state." }),
  referral: z
    .string()
    .min(2, { message: "Must be at least 2 characters." })
    .max(25, { message: "Must be less than 25 characters." }),
  roles: z.array(z.string()),
});

import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";

import { Checkbox } from "@components/ui/checkbox";

import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { ScrollArea } from "../ui/scroll-area";
import StatesSelector from "../ui/states";

const UserForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      state: "",
      age: "yes",
      activist: "",
      referral: "",
      roles: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("triggered");
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (First and Last)</FormLabel>
              <FormControl>
                <Input placeholder="First Name Last Name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <StatesSelector form={form} />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are you over 13 years old.</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activist"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Are you a</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="student activist" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      A student activist
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="youth activist" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      A youth activist (no longer a student, but under 25)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="interested" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Just interested in learning more
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referral"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about 100 Million US?</FormLabel>
              <FormControl>
                <Input placeholder="Facebook, Twitter, etc.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Choose which, if any, of the following roles interest you:
                </FormLabel>
              </div>
              {roles.map((role) => (
                <FormField
                  key={role.id}
                  control={form.control}
                  name="roles"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={role.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(role.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, role.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== role.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {role.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UserForm;
