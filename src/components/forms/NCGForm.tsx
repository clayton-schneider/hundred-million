import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import * as z from "zod";

const levels = [
  { id: "elementary", label: "Elementary School" },
  { id: "middle", label: "Middle School" },
  {
    id: "high",
    label: "High School",
  },
  { id: "undergraduate", label: "Undergraduate Students" },
  { id: "graduate", label: "Graduate Students" },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Fullname must be at least 3 characters.",
  }),
  email: z
    .string({ required_error: "Please make sure to enter your email." })
    .email(),
  about: z.string().min(1, { message: "Please share a bit about yourself." }),
  age: z.string().min(1, { message: "Please select your age." }),
  proudest_moment: z
    .string()
    .min(1, { message: "Please share your proudest moment" }),
  goal: z.string().min(1, { message: "Please share your goal." }),
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
  FormDescription,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { handleForm } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

const NCGForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      about: "",
      age: "",
      proudest_moment: "",
      goal: "",
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
      "100 Million: Teacher Form",
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
          name="about"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Tell us a little about yourself! Why would you make a good
                addition to the 100Mill NCG team?
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
          name="proudest_moment"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>What is your proudest activism moment?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your proudest moment here..."
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
          name="goal"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                What do you hope to accomplish as an NCG member?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share what you hope to accomplish here..."
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

export default NCGForm;
