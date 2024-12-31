"use client";
import localforage from 'localforage';
import { useState, useEffect } from "react";
import Divyaimg from "../../../assets/team_divya.svg";
import Mayaimg from "../../../assets/team_maya.svg";
import Peterimg from "../../../assets/team_peter.svg";
import Premimg from "../../../assets/team_prem.svg";
import Priyaimg from "../../../assets/team_priya.svg";
import Teamscomp from "./teams-comp";

const Page = () => {
  const [inputValues, setInputValues] = useState<{ image: string | null }>({
    image: null,
  });

  const [teamsData, setTeamsData] = useState<{ id: number; image: string | null }[]>([]);

  useEffect(() => {
    localforage.getItem("teamsData").then((savedTeams) => {
        if (Array.isArray(savedTeams)) {
            console.log("Loaded teams data from localForage:", savedTeams);
            setTeamsData(savedTeams);
      } else {
        const defaultTeams = [
          { id: 1, image: Divyaimg },
          { id: 2, image: Mayaimg },
          { id: 3, image: Premimg },
          { id: 4, image: Peterimg },
          { id: 5, image: Priyaimg },
        ];
        console.log("No teams data in localForage, setting default teams.");
        setTeamsData(defaultTeams);
      }
    });
  }, []);
  
  useEffect(() => {
    if (teamsData.length > 0) {
      localforage.setItem("teamsData", teamsData).then(() => {
        console.log("Teams data saved to localForage");
      });
    }
  }, [teamsData]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const base64 = await convertToBase64(files[0]);
      setInputValues({ image: base64 });
    }
  };

  const handleCreate = () => {
    if (!inputValues.image) return;
    const newTeam = { id: teamsData.length + 1, image: inputValues.image };
    const updatedTeams = [...teamsData, newTeam];
    setTeamsData(updatedTeams);
    localforage.setItem("teamsData", updatedTeams).then(() => {
      console.log("Teams data saved to localForage after creation");
    });
    setInputValues({ image: null }); // Reset after creation
  };

  const handleDelete = (id: number) => {
    const updatedTeams = teamsData.filter((team) => team.id !== id);
    setTeamsData(updatedTeams);
    localforage.setItem("teamsData", updatedTeams).then(() => {
      console.log("Teams data saved to localForage after deletion");
    });
  };

  const handleUpdate = (id: number) => {
    if (!inputValues.image) return;
    const updatedTeams = teamsData.map((team) =>
      team.id === id ? { ...team, image: inputValues.image } : team
    );
    setTeamsData(updatedTeams);
    localforage.setItem("teamsData", updatedTeams).then(() => {
      console.log("Teams data saved to localForage after update");
    });
    setInputValues({ image: null }); // Reset after update
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="flex flex-col gap-y-9">
        <p className="text-2xl font-bold">Teams page:</p>
        <div className="flex flex-col">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="block"
          />
        </div>
        <div className="flex gap-6">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-7 md:flex-row items-center justify-center">
        {teamsData.map((team) => (
          <div key={team.id} className="border rounded mb-4">
            <Teamscomp image={team.image} isMobile={false} />
            <div className="flex gap-6 items-center justify-center mb-4">
              <button
                onClick={() => handleDelete(team.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(team.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center gap-y-8 mt-12">
        <p className="text-2xl md:text-4xl font-bold">Our Team</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {teamsData.map((team) => (
            <div key={team.id} className="flex justify-center items-center">
              <Teamscomp image={team.image} isMobile={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
