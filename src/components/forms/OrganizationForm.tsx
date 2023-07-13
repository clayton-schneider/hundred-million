import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import * as z from "zod";

const formSchema = z.object({
  organization: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  website: z.string().min(1, {
    message: "Please make sure to enter your website.",
  }),
  mission: z.string().min(1, {
    message: "Please make sure to enter your mission.",
  }),
  state: z.string().min(1, { message: "Please select a state." }),
  contact: z
    .string()
    .min(1, { message: "Please make sure to enter your name." }),
  role: z.string().min(1, { message: "Please make sure to enter your role." }),
  email: z
    .string({ required_error: "Please make sure to enter your email." })
    .email(),
  phone: z.string().refine(validator.isMobilePhone, {
    message: "Please enter a valid phone number",
  }),
  referral: z.string().min(1, {
    message: "Please make sure to enter how you found us.",
  }),
  need: z.string().min(1, {
    message: "Please make sure to enter any help you need.",
  }),
});

import { useForm } from "react-hook-form";

import { Textarea } from "@components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import StatesSelector from "@components/ui/states";
import { handleForm } from "@/lib/utils";

const IndividualForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      website: "",
      mission: "",
      state: "",
      contact: "",
      role: "",
      email: "",
      phone: "",
      referral: "",
      need: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    handleForm(
      {
        to: [
          { email: "clayton@simply-sprout.com", name: "Clayton Schneider" },

          { email: "usa@100million.org", name: "Hundred Million US" },
        ],
        from: {
          email: "noreply@simply-sprout.com",
          name: "Website Email Bot",
        },
        subject: "Email Form Submission",
      },
      "100 Million: Organization Form",
      values
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full gap-8 flex flex-col lg:grid lg:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of organization</FormLabel>
              <FormControl>
                <Input placeholder="Your organization's name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website or social</FormLabel>
              <FormControl>
                <Input placeholder="www.example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Organization's mission and vision</FormLabel>
              <FormControl>
                <Input placeholder="Your mission here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <StatesSelector className="col-span-2" form={form} />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name & pronouns of contact person</FormLabel>
              <FormControl>
                <Input placeholder="John Doe (he/him)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role of contact person</FormLabel>
              <FormControl>
                <Input
                  placeholder="Programs Coordinator, Volunteer Head, Outreach Manager"
                  {...field}
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referral"
          render={({ field }) => (
            <FormItem className="col-span-2">
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
          name="need"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                How can we help? What does your organization hope to gain from
                joining the 100 Million US network?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="i.e. capacity-building resources, program ideas/revisions, access to network of chil right's activists and leads, etc..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!form.formState.isSubmitSuccessful && (
          <button
            type="submit"
            className="mx-auto lg:mx-0 bg-primary block px-16 py-3 rounded-full font-bebas text-2xl text-white cursor-pointer"
          >
            Submit
          </button>
        )}
        {form.formState.isSubmitSuccessful && (
          <p>Your entry was successfully submitted. You may leave this page</p>
        )}
      </form>
    </Form>
  );
};

export default IndividualForm;
