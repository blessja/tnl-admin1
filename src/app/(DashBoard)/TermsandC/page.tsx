"use client";
import { useState, useEffect } from "react";
import localforage from "localforage";
import TandC from "./terms-and-conditions";
import { Trash2, Plus, Palette } from "lucide-react";

interface ContentPoint {
    text: string;
    color: string;
}

interface TandCData {
    id: number;
    title: string;
    contentPoints: ContentPoint[];
}

const Page = () => {
    const [components, setComponents] = useState<TandCData[]>([]);
    const [tempTitle, setTempTitle] = useState("Registration Fees:");
    const [tempPoint, setTempPoint] = useState("");
    const [tempColor, setTempColor] = useState("#000000");
    const [tempPoints, setTempPoints] = useState<ContentPoint[]>([]);

    useEffect(() => {
        const loadComponents = async () => {
            const savedComponents = await localforage.getItem<TandCData[]>("components");
            if (savedComponents) {
                setComponents(savedComponents);
            }
        };
        loadComponents();
    }, []);

    useEffect(() => {
        localforage.setItem("components", components);
    }, [components]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempTitle(e.target.value);
    };

    const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempPoint(e.target.value);
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempColor(e.target.value);
    };

    const handleAddPoint = () => {
        if (tempPoint.trim() !== "") {
            setTempPoints([...tempPoints, { text: tempPoint, color: tempColor }]);
            setTempPoint("");
            setTempColor("#000000");
        }
    };

    const handleDeletePoint = (index: number) => {
        const newPoints = tempPoints.filter((_, i) => i !== index);
        setTempPoints(newPoints);
    };

    const handleCreateComponent = () => {
        setComponents([
            ...components,
            {
                id: Date.now(),
                title: tempTitle,
                contentPoints: [...tempPoints],
            },
        ]);
        setTempTitle("Registration Fees:");
        setTempPoints([]);
    };

    const handleDeleteComponent = (id: number) => {
        setComponents(components.filter((component) => component.id !== id));
    };

    return (
        <div className="p-4 flex flex-col gap-y-8">
            <p className="text-2xl font-bold">Terms and Conditions Page:</p>
            <div className="flex flex-col gap-y-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Title text:</label>
                    <input
                        type="text"
                        onChange={handleTitleChange}
                        value={tempTitle}
                        className="block border rounded p-2"
                        placeholder="Enter title text"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        onChange={handlePointChange}
                        value={tempPoint}
                        className="block border rounded p-2 w-full"
                        placeholder="Enter a content point"
                    />
                    <input
                        type="color"
                        onChange={handleColorChange}
                        value={tempColor}
                        className="w-10 h-10"
                    />
                    <button
                        onClick={handleAddPoint}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        <Plus />
                    </button>
                </div>

                <ul className="list-disc pl-6 space-y-2">
                    {tempPoints.map((point, index) => (
                        <li key={index} className="flex items-center gap-2" style={{ color: point.color }}>
                            {point.text}
                            <button onClick={() => handleDeletePoint(index)} className="text-red-500">
                                <Trash2 />
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleCreateComponent}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create Component
                </button>
            </div>

            <div className="flex flex-col gap-y-8">
                {components.map((component) => (
                    <div key={component.id} className="border p-4 rounded shadow">
                        <TandC title={component.title} contentPoints={component.contentPoints} />
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => handleDeleteComponent(component.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete Component
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
