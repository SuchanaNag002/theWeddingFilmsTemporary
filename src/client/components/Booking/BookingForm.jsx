"use client"
import React from "react";
import { useState } from "react";
import Nav from "../Nav/Nav";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    details: "",
  });

  const handleBooking = async () => {
    try {
      // Post the data using ApiCaller
      await ApiCaller.SendEmail(formData);
      setFormData({
        name: "",
        email: "",
        date: "",
        details: "",
      });
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.toString(),
    });
  };
  return (
    <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 h-max w-full m-0">
      <Nav />
      <div className="">
        <h1 className="text-6xl font-bold text-center my-8 uppercase text-black">
          Get A Quote
        </h1>
        <a href="https://storyset.com/people" className="pointer-events-none">
          <img className="" src="HomePNG.png" />
        </a>
      </div>
      <form className="flex flex-col items-center justify-center gap-6 px-4 py-10 text-black">
        <h1 className="text-3xl font-bold text-center my-8 uppercase">
          {"Let's Get In Touch!"}
        </h1>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
          className="w-3/4 mx-2 py-4 px-6 rounded-lg shadow-around outline-none
                                        border-b-2 border-solid border-black text-2xl font-medium"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Enter Your Contact Email"
          className="w-3/4 mx-2 py-4 px-6 rounded-lg shadow-around outline-none
                                        border-b-2 border-solid border-black text-2xl font-medium"
        />
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          className="w-3/4 mx-2 py-4 px-6 rounded-lg shadow-around outline-none
                                        border-b-2 border-solid border-black text-2xl font-medium"
        />
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Enter Details"
          className="w-3/4 mx-2 py-4 px-6 rounded-lg shadow-around outline-none
                                        border-b-2 border-solid border-black text-2xl font-medium min-h-max"
        />
        <button
          type="button"
          onClick={handleBooking}
          className="text-2xl text-white bg-black hover:bg-white 
                                        hover:text-black px-6 py-4 shadow-around rounded-2xl"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
