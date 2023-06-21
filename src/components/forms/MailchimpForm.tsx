import { useState, useEffect } from "react";
import jsonp from "jsonp";
const formUrl =
  "https://100million.us19.list-manage.com/subscribe/post?u=d402d99bd9cd2e66b5203d56c&id=7af4ecddbb&f_id=00068ce4f0";
const MailchimpForm = () => {
  const [email, setEmail] = useState("");
  // invalid, ready, sending, success, error
  const [status, setStatus] = useState("invalid");

  const getAjaxUrl = (url) => url.replace("/post?", "/post-json?");

  const submit = () => {
    setStatus("sending");
    const url = `${getAjaxUrl(formUrl)}&EMAIL=${email}`;

    jsonp(
      url,
      {
        param: "c",
      },
      (err, data) => {
        if (err) {
          console.log(err);
          setStatus("error");
        } else if (data.result !== "success") {
          setStatus("error");
        } else {
          setStatus("success");
        }
      }
    );
  };

  const validate = () => {
    if (email.length < 5) {
      setStatus("invalid");
      return;
    }

    if (email.indexOf("@") === -1) {
      setStatus("invalid");
      return;
    }

    setStatus("ready");
  };

  useEffect(validate, [email]);
  return (
    <form>
      <div className="flex flex-wrap justify-center gap-2">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          type="email"
          className="bg-transparent border border-black focus:outline-none rounded-full :py-3 w-64 px-4 text-sm text-text-light placeholder:text-text-light"
        ></input>
        <button
          disabled={status !== "ready" ? true : false}
          onClick={submit}
          className="bg-black inline-block px-16 py-3 rounded-full font-bebas text-large text-white cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      <div className="mt-2 text-lg text-center">
        {status === "sending" && <p>sending...</p>}
        {status === "success" && <p>You have successfully subscribed.</p>}
        {status === "error" && <p>There was an error, try again later.</p>}
      </div>
    </form>
  );
};

export default MailchimpForm;
