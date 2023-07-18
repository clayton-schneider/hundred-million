import PrimaryBtn from "@components/buttons/PrimaryBtn";
import React, { useState } from "react";
interface Props {
  name: string;
  message: string;
  error: string;
  fields: {
    fieldType: string;
    id: string;
    name: string;
  }[];
}
type FormState = "ready" | "pending" | "success" | "error";

const ContactForm = ({ name, message, error, fields }: Props) => {
  function initializeForm(fields) {
    const form = {};
    fields.forEach((field) => (form[field.id] = ""));
    return form;
  }
  const [formData, setData] = useState(initializeForm(fields));
  const [formState, setFormState] = useState<FormState>("ready");

  const sendOptions = {
    to: [
      { email: "clayton@simply-sprout.com", name: "Clayton Schneider" },

      { email: "usa@100million.org", name: "Hundred Million US" },
    ],
    from: {
      email: "noreply@simply-sprout.com",
      Name: "Website Email Bot",
    },
    subject: "Email Form Submission",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fetchBody = JSON.stringify({
      form: {
        name,
        data: formData,
      },
      sendOptions,
    });

    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
      body: fetchBody,
    };

    setFormState("pending");

    try {
      await fetch(
        "https://send-email.simplysprout.workers.dev/",
        requestOptions
      );
      setFormState("success");
    } catch (err) {
      setFormState("error");
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    formData[id] = value;
    setData(formData);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="mt-10 grow w-full my-5 grid grid-cols-1 gap-4"
    >
      {fields.map((field, key) => (
        <div className="col-span-full relative" key={`input-${key}`}>
          <label htmlFor={field.id} className="invisible absolute">
            {field.name}
          </label>
          {field.fieldType === "textarea" ? (
            <textarea
              onChange={handleChange}
              name={field.name}
              id={field.id}
              className="w-full bg-transparent focus:outline-none focus:border-b-primary resize-none border-b-gray-800 border-b p-2 h-[150px]"
              placeholder={field.name}
            />
          ) : (
            <input
              onChange={handleChange}
              type={field.fieldType}
              name={field.name}
              id={field.id}
              className="w-full bg-transparent focus:outline-none border-b-gray-800 focus:border-b-primary border-b p-2"
              placeholder={field.name}
            />
          )}
        </div>
      ))}

      {formState === "ready" && (
        <button className="col-span-full bg-primary text-center inline-block px-16 py-3 rounded-full font-bebas text-2xl text-white cursor-pointer">
          Send Message
        </button>
      )}
      {formState === "pending" && <p>sending...</p>}
      {formState === "success" && <p>{message}</p>}
      {formState === "error" && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default ContactForm;
