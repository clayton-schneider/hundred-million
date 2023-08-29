import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Fullname must be at least 3 characters.",
  }),
  email: z
    .string({ required_error: "Please make sure to enter your email." })
    .email(),
  about: z.string().min(1, { message: "Please share your proudest moment" }),
  why: z.string().min(1, { message: "Please share your goal." }),
  sample: z.literal(true, {
    errorMap: () => ({
      message:
        "Please confirm that you have sent a writing sample to usa@100million.org",
    }),
  }),
  resume: z.literal(true, {
    errorMap: () => ({
      message:
        "Please confirm that you have sent your resume to usa@100million.org",
    }),
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
import { handleForm } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

const JobForm = ({ job }: { job: string }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      why: "",
      about: "",
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
      "100 Million: " + job,
      values
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="name"
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
        <FormField
          control={form.control}
          name="why"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Why do you want to intern with 100 Million? (Limit 250 words)
              </FormLabel>
              <FormControl>
                <Textarea
                  maxLength={1250}
                  placeholder="Explain why here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Tell us a bit about why this internship interests you! (Limit
                250 words)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your story here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sample"
          render={({ field }) => (
            <div className="space-y-2">
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    //@ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I emailed a writing sample to usa@100million.org
                  </FormLabel>
                </div>
              </FormItem>
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <div className="space-y-2">
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    //@ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I emailed a copy of my resume to usa@100million.org
                  </FormLabel>
                </div>
              </FormItem>
              <FormMessage />
            </div>
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

export default JobForm;
