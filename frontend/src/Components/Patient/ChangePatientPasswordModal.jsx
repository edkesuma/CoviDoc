"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { IoIosLock } from "react-icons/io"; // Icon for lock
import { useState } from "react";

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      console.log("Password changed successfully");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-lg border-4 border-cyan-400 max-w-lg w-full"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6  text-center">
          Change Your Password
        </h2>

        {/* Current Password */}
        <div className="mb-4">
          <Label htmlFor="currentPassword" className="text-lg mb-2">
            Enter current password
          </Label>
          <div className="relative">
            <TextInput
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className=""
            />
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <Label htmlFor="newPassword" className="text-lg mb-2">
            Enter new password
          </Label>
          <div className="relative">
            <TextInput
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className=""
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <Label htmlFor="confirmPassword" className="text-lg mb-2">
            Confirm new password
          </Label>
          <div className="relative">
            <TextInput
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className=""
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <Button
            type="button"
            className="w-full py-1 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full py-1 bg-cyan-500 text-white hover:bg-cyan-400 transition-colors"
          >
            Done
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
