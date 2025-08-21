"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setStatus("Message sent!");
    else setStatus("Failed to send message.");
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Consultation Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}
