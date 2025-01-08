"use client";

import { useState, useEffect } from "react";
import Comp from "./MissionVission";

const Page = () => {
  const [missionText, setMissionText] = useState("");
  const [visionText, setVisionText] = useState("");

  // Temporary states for input fields
  const [tempMissionText, setTempMissionText] = useState("");
  const [tempVisionText, setTempVisionText] = useState("");

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedMissionText = localStorage.getItem("missionText") || "";
    const savedVisionText = localStorage.getItem("visionText") || "";
    setMissionText(savedMissionText);
    setVisionText(savedVisionText);
    setTempMissionText(savedMissionText);
    setTempVisionText(savedVisionText);
  }, []);

  // Handler functions for input changes
  const handleMissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempMissionText(e.target.value);
  };

  const handleVisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempVisionText(e.target.value);
  };

  // Update the states and save to localStorage when the Update button is clicked
  const handleUpdate = () => {
    setMissionText(tempMissionText);
    setVisionText(tempVisionText);
    localStorage.setItem("missionText", tempMissionText);
    localStorage.setItem("visionText", tempVisionText);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-9">
        <p className="text-2xl font-bold">Mission and Vision Page:</p>

        {/* Input field for mission text */}
        <div>
          <div className="flex flex-col">
            <label className="block text-gray-700 font-bold mb-2">
              Mission Text:
            </label>
            <input
              type="text"
              name="mission"
              onChange={handleMissionChange}
              className="block border rounded p-2"
              placeholder="Enter mission text"
              value={tempMissionText}
            />
          </div>
          <div className="flex gap-6 mt-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </div>

        {/* Input field for vision text */}
        <div>
          <div className="flex flex-col">
            <label className="block text-gray-700 font-bold mb-2">
              Vision Text:
            </label>
            <input
              type="text"
              name="vision"
              onChange={handleVisionChange}
              className="block border rounded p-2"
              placeholder="Enter vision text"
              value={tempVisionText}
            />
          </div>
          <div className="flex gap-6 mt-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </div>

        {/* Displaying the text changes in the component */}
        <div>
          <Comp Missiontext={missionText} Vissiontext={visionText} />
        </div>
      </div>
    </div>
  );
};

export default Page;
