"use client";

import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { IoPerson } from "react-icons/io5";
import { FaTransgender, FaBirthdayCake, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail, IoIosClose } from "react-icons/io";
import React, { useState } from "react";

function EditAccountForm() {
  const [name, setName] = useState("Laura Hamilton");
  const [gender, setGender] = useState("Female");
  const [dob, setDob] = useState("2000-10-01");
  const [email, setEmail] = useState("laurah@gmail.com");
  const [phone, setPhone] = useState("8346 5123");
  const [allergies, setAllergies] = useState("Has peanut allergy.");
  const [medicalHistory, setMedicalHistory] = useState(
    "No known medical history."
  );
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, gender, dob, email, phone, allergies, medicalHistory });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl p-8 border-4 border-cyan-400 rounded-lg bg-white shadow-lg grid grid-cols-2 gap-8 relative"
      >
        {/* Close Icon */}
        <div className="absolute right-4 top-4 cursor-pointer">
          <IoIosClose size={28} color="cyan" />
        </div>

        {/* Title */}
        <div className="col-span-2 text-center mb-6">
          <h2 className="text-2xl font-bold text-cyan-500">Editing Your Account</h2>
        </div>

        {/* Left Side: Image and Basic Details */}
        <div className="relative flex flex-col items-center px-5 space-y-3">
            <div className="relative w-60 h-60">
                <img
                src={profileImage ? profileImage : "https://via.placeholder.com/200"}
                alt="Profile"
                className="w-60 h-60 object-cover mb-1"
            />
            <label className="absolute bottom-0 left-0 right-0 bg-cyan-400 text-white text-center py-2 cursor-pointer opacity-80">

                Change Image
                <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                />
            </label>
            </div>

      

          <div className="w-full flex items-center space-x-2">
            <IoPerson className="text-cyan-500 text-2xl" />
            <TextInput
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="w-full flex items-center space-x-2">
            <FaTransgender className="text-cyan-500 text-2xl" />
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full py-2 border border-gray-300 rounded"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="w-full flex items-center space-x-2">
            <FaBirthdayCake className="text-cyan-500 text-2xl" />
            <TextInput
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="w-full flex items-center space-x-2">
            <IoIosMail className="text-cyan-500 text-2xl" />
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="w-full flex items-center space-x-2">
            <FaPhoneAlt className="text-cyan-500 text-2xl" />
            <TextInput
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Right Side: Allergies and Medical History */}
        <div className="space-y-5">
          <div>
            <Label
              htmlFor="allergies"
              value="Allergies"
              className="text-cyan-500 font-medium text-lg"
            />
            <Textarea
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              rows={10}
              className="w-full resize-none"
            />
          </div>

          <div>
            <Label
              htmlFor="medicalHistory"
              value="Medical History"
              className="text-cyan-500 font-medium text-lg"
            />
            <Textarea
              id="medicalHistory"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              rows={10}
              className="w-full resize-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-2 flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full text-cyan-500 border-cyan-400 bg-white hover:bg-cyan-400 hover:text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditAccountForm;
