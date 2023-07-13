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
  phone: z.string().refine(validator.isMobilePhone, {
    message: "Please enter a valid phone number",
  }),
  state: z.string().min(1, { message: "Please select a state." }),
  level: z.string().min(1, {
    message: "Please select the students that you teach.",
  }),
  school: z.string().min(1, {
    message: "Please make sure to enter the school you teach at.",
  }),
  need: z.string().min(1, {
    message: "Please make sure to enter any help you need.",
  }),
  referral: z.string().min(1, {
    message: "Please make sure to enter how you found us.",
  }),
});

import { useForm } from "react-hook-form";

import { Textarea } from "@components/ui/textarea";

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
import StatesSelector from "@components/ui/states";
import { handleForm } from "@/lib/utils";

const TeacherForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      state: "",
      level: "",
      school: "",
      need: "",
      referral: "",
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
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <StatesSelector className="col-span-2" form={form} />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>What age are the students you teach?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {levels.map((level) => (
                    <FormItem
                      key={level.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={level.id} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {level.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of school/university</FormLabel>
              <FormControl>
                <Input placeholder="School name" {...field} />
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

export default TeacherForm;
