"use client";
import React, { useState } from "react";
import Cofounderscomp from "./Cofounders-comp";
import Pinnaccf from "../../../assets/cf_pinnac.svg";
import Siddhicf from "../../../assets/cf_siddhi.svg";
import Shubhamcf from "../../../assets/cf_shubham.svg";

const Cofounders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    cfTitle: "",
    cfName: "",
    cfDescription: "",
    cfImage: null,
  });

  const [cofoundersData, setCofoundersData] = useState([
    {
      id: 1,
      title: "CEO & Marketing Head",
      name: "Pinnac Yeddy",
      description:
        "Pinnac Yeddy, the CEO and Marketing Head of The Language Network, brings extensive marketing experience and passion to our team. He leads product development, branding, marketing, and business strategy, driving our vision for growth. Under his leadership, the company has seen consistent innovation and expansion. Pinnac is committed to making language learning accessible and enjoyable for all. With a clear focus on achieving the company&apos;s long-term goals, he believes in empowering the team, promoting a collaborative work environment, and fostering creativity. His leadership style emphasizes transparency, efficiency, and teamwork.",
      image: Pinnaccf,
    },
    {
      id: 2,
      title: "Chief of Staff",
      name: "Siddhi Chokani",
      description:
        "Siddhi Chokani, the dynamic Chief of Staff at The Language Network. It was Siddhi&apos;s profound expertise in French that served as the catalyst for The Language Network&apos;s inception. Her background in language and education brings immense value to the team. She is passionate about fostering a love for languages among students and creating a structured, effective curriculum. Siddhi is dedicated to providing an enriching learning experience for all students, focusing on individual growth and progress. Her leadership extends beyond administration; she&apos;s also an inspiration to her team, always encouraging innovative thinking and continuous improvement.",
      image: Siddhicf,
    },
    {
      id: 3,
      title: "Chief Operating Officer",
      name: "Shubham Pille",
      description:
        "Meet our co-founder, Shubham Pille, the dedicated Chief Operating Officer at The Language Network. With a keen eye for detail and a knack for multitasking, Shubham oversees various critical aspects of our organization, ensuring smooth daily operations. His focus on operational efficiency and resource management is integral to our success. Shubham is passionate about the intersection of technology and education, striving to enhance the accessibility and effectiveness of our language learning platforms. He believes in creating an environment where both students and team members can thrive, fostering growth through technology-driven solutions.",
      image: Shubhamcf,
    },
  ]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setInputValues({ ...inputValues, [name]: files[0] });
    }
  };

  // Mock Create Functionality
  const handleCreate = () => {
    const newCofounder = {
      id: cofoundersData.length + 1,
      title: inputValues.cfTitle,
      name: inputValues.cfName,
      description: inputValues.cfDescription,
      image: inputValues.cfImage,
    };
    setCofoundersData([...cofoundersData, newCofounder]);
    setInputValues({ cfTitle: "", cfName: "", cfDescription: "", cfImage: null });
  };

  // Mock Delete Functionality
  const handleDelete = (id: number) => {
    const updatedData = cofoundersData.filter((item) => item.id !== id);
    setCofoundersData(updatedData);
  };

  // Mock Update Functionality
  const handleUpdate = (id: number) => {
    const updatedData = cofoundersData.map((item) =>
      item.id === id
        ? {
            ...item,
            name: inputValues.cfName || item.name,
            description: inputValues.cfDescription || item.description,
            image: inputValues.cfImage || item.image,
          }
        : item
    );
    setCofoundersData(updatedData);
    setInputValues({ cfTitle: "", cfName: "", cfDescription: "", cfImage: null });
  };


  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Cofounders Section</h1>

      {/* Input Fields */}
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            name="cfTitle"
            placeholder="Enter title of co-founder"
            value={inputValues.cfTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="cfName"
            placeholder="Enter name of co-founder"
            value={inputValues.cfName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="cfDescription"
            placeholder="Enter description of co-founder"
            value={inputValues.cfDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            name="cfImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="block"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>

      {/* Cofounders List */}
      <div className="mt-6">
        {cofoundersData.map((cofounder) => (
          <div key={cofounder.id} className="border rounded p-4 mb-4">
            <Cofounderscomp
              cftitle={cofounder.title}
              cfname={cofounder.name}
              cfdescription={cofounder.description}
              cfimage={cofounder.image}
            />
            <div className="flex gap-6">
              <button
                onClick={() => handleDelete(cofounder.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
              >
                Delete
              </button>

              <button
                onClick={() => handleUpdate(cofounder.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cofounders;
