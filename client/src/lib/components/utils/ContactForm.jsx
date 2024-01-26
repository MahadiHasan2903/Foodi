"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  ArrowRightIcon,
  MailIcon,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { Input } from "../ui/input";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all fields");
      return;
    }

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    toast.success("Message sent successfully");
  };

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit}
      id="contactForm"
    >
      <div className="relative flex items-center">
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <User className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MailIcon className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Input
          type="text"
          id="subject"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Send className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center">
        <Textarea
          id="message"
          placeholder="Write your feedback here...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <MessageSquare className="absolute top-4 right-6" size={20} />
      </div>

      <Button
        className="flex gap-x-1 items-center max-w-[166px]"
        type="submit"
        onClick={handleSubmit}
      >
        Send
        <ArrowRightIcon size={20} />
      </Button>
    </form>
  );
};

export default ContactForm;
