"use client";

import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

function ChangePasswordForm() {
  // State for individual inputs
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle input changes for currentPassword
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  // Function to handle input changes for newPassword
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Function to handle input changes for confirmPassword
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log("Password changed successfully:", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
    } else {
      console.log("Passwords do not match");
    }
  };

  // Function to handle the Cancel button
  const handleCancel = () => {
    // Clear all input fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    console.log("Password change canceled");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-8 border-2 border-cyan-400 rounded-lg bg-white shadow-lg space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-cyan-500">Change Your Password</h2>

        {/* Current Password */}
        <div className="w-full">
          <Label htmlFor="currentPassword" value="Enter current password" />
          <TextInput
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
          />
        </div>

        {/* New Password */}
        <div className="w-full">
          <Label htmlFor="newPassword" value="Enter new password" />
          <TextInput
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        {/* Confirm New Password */}
        <div className="w-full">
          <Label htmlFor="confirmPassword" value="Confirm new password" />
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            className="w-1/2 mr-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-1/2 ml-2 border-cyan-400 text-cyan-500 hover:bg-cyan-400 hover:text-white"
          >
            Done
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
