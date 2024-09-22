import { Button } from "flowbite-react";
import React from "react";

function DropImageInput({ file, setFile, show }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <label
        htmlFor="dropzone-file"
        className={
          `flex flex-col items-center justify-center w-full 
           rounded-lg cursor-pointer 
           ${file ? "bg-transparent" : "bg-gray-50 border-2 border-gray-300 border-dashed"} 
           dark:hover:bg-bray-800 dark:${file ? "bg-transparent" : "bg-gray-700"} 
           hover:${file ? "bg-transparent" : "bg-gray-100"} 
           dark:border-gray-600 dark:hover:border-gray-500 dark:hover:${file ? "bg-transparent" : "bg-gray-600"}`
        }
      >
        {file ? (
          <div className="relative w-full flex flex-col items-center">
            {/* if file is type File, make it to URL */}
            {file instanceof File && (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded Preview"
                className="w-60 h-70 object-cover mb-2"
              />
            )}
            {/* if file is type string, no need to make it URL bcs it is already a link */}
            {typeof file === 'string' && (
              <img
                src={file}
                alt="Uploaded Preview"
                className="w-60 h-70 object-cover mb-2"
              />
            )}
            <button
              className="absolute bottom-2 left-1 right-1 bg-cyan-400 text-white px-12 py-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setFile(null)}
            >
              Change Image
            </button>
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            {show && (
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(ev) => {
                  setFile(ev.target.files[0]);
                }}
              />
            )}
          </div>
        )}
      </label>
    </div>
  );
}

export default DropImageInput;
