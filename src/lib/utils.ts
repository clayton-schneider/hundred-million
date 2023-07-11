import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SendOptions {
  to: {
    email: String;
    name: String;
  }[];
  from: {
    email: String;
    name: String;
  };
  subject: String;
}

export async function handleForm(
  sendOptions: SendOptions,
  formName: String,
  formData
) {
  const fetchBody = JSON.stringify({
    form: {
      name: formName,
      data: formData,
    },
    sendOptions,
  });

  const requestOptions = {
    method: "POST",
    headers: { "content-type": "application/json;charset=UTF-8" },
    body: fetchBody,
  };

  try {
    await fetch("https://send-email.simplysprout.workers.dev/", requestOptions);
    console.log("success");
  } catch (err) {
    console.log(`[ERROR][HANDLE FORM: ${formName}]`);
  }
}
