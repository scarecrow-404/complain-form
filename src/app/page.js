"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  function handleInput(event) {
    const newObj = { ...data, [event.target.name]: event.target.value };
    setData(newObj);
  }
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    detail: "",
  });
  const [error, setError] = useState({});
  function validate() {
    const error = {};
    if (data.firstname === "") {
      error.firstname = "Please enter your first name";
    }
    if (data.lastname === "") {
      error.lastname = "Please enter your last name";
    }
    if (data.email === "" || data.phone === "") {
      if (data.email === "" && data.phone === "") {
        error.email = "Please enter at least one of email or phone number";
      }
      if (data.phone === "" && data.email === "") {
        error.phone = "Please enter at least one of email or phone number";
      }
    }
    if (data.detail === "") {
      error.detail = "Please enter your detail";
    }
    if (
      data.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
    ) {
      error.email = "Invalid email address";
    }
    if (
      data.phone &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        data.phone
      )
    ) {
      error.phone = "Invalid phone number";
    }
    if (data.detail.length > 1000) {
      error.detail = "Please enter less than 1000 characters";
    }
    return error;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const error = validate();

    setError(error);
    if (Object.keys(error).length === 0) {
      setError({});
      toast.success("Submit successfully", {
        position: "top-right",
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: "#D0E7D2",
          color: "#2B2B2B",
          padding: "16px 6px",
        },
      });
      console.log("Toast triggered!");
      console.log(data);
      setData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        detail: "",
      });
    }
  }
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-between p-6 gap-4">
      <h1 className="text-3xl font-bold"> Complain form</h1>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm ">
        <form className="flex flex-col gap-4 min-w-64 " onSubmit={handleSubmit}>
          <lebel htmlFor="firstname">Firstname</lebel>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className=" text-black p-2"
            placeholder="Firstname"
            value={data.firstname}
            onChange={handleInput}
          />
          <span className="text-red-500">{error.firstname}</span>
          <lebel htmlFor="lastname">Lastname</lebel>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className=" text-black p-2 "
            placeholder="Lastname"
            value={data.lastname}
            onChange={handleInput}
          />
          <span className="text-red-500">{error.lastname}</span>
          <lebel htmlFor="email">Email</lebel>
          <input
            type="email"
            id="email"
            name="email"
            className=" text-black p-2 "
            placeholder="example@mail.com"
            value={data.email}
            onChange={handleInput}
          />
          <span className="text-red-500">{error.email}</span>
          <lebel htmlFor="phone">Phone Number</lebel>
          <input
            type="text"
            id="phone"
            name="phone"
            className=" text-black p-2 "
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleInput}
          />
          <span className="text-red-500">{error.phone}</span>
          <lebel htmlFor="detail">Complain Detail</lebel>
          <textarea
            rows={20}
            type="text"
            name="detail"
            id="detail"
            className="text-black p-2 h-60"
            value={data.detail}
            onChange={handleInput}
          />
          <span className="text-red-500">{error.detail}</span>
          <button className="bg-blue-500 rounded-xl p-2">submit</button>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
}
