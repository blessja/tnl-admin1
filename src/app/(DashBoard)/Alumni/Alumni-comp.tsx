'use client';

import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import localforage from 'localforage';
import img1 from './logo1.png';
import img2 from './logo2.png';
import img3 from './logo3.png';
import img4 from './logo4.png';
import img5 from './logo5.png';

const defaultLogos: (string | StaticImageData)[] = [img1, img2, img3, img4, img5];

const Alumni = () => {
  const [logos, setLogos] = useState<(string | StaticImageData)[]>([]);
  const [newLogo, setNewLogo] = useState<File | null>(null);
  const [selectedLogoIndex, setSelectedLogoIndex] = useState<number | null>(null);

  // Function to convert File to Base64
  const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // Load logos from local storage or set default
  useEffect(() => {
    const loadLogos = async () => {
      const storedLogos = await localforage.getItem<string[]>('logos');
      if (storedLogos) {
        setLogos(storedLogos);
      } else {
        setLogos(defaultLogos);
      }
    };
    loadLogos();
  }, []);

  // Save logos to local storage
  const saveLogos = async (updatedLogos: (string | StaticImageData)[]) => {
    setLogos(updatedLogos);
    await localforage.setItem('logos', updatedLogos);
  };

  // Handle file input change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewLogo(e.target.files[0]);
    }
  };

  // Add new logo to the list
  const handleAddLogo = async () => {
    if (newLogo) {
      const newLogoBase64 = await fileToBase64(newLogo);
      saveLogos([...logos, newLogoBase64]);
      setNewLogo(null);
    }
  };

  // Update existing logo in the list
  const handleUpdateLogo = async (index: number) => {
    if (newLogo) {
      const updatedLogos = [...logos];
      const updatedLogoBase64 = await fileToBase64(newLogo);
      updatedLogos[index] = updatedLogoBase64;
      saveLogos(updatedLogos);
      setNewLogo(null);
      setSelectedLogoIndex(null);
    }
  };

  // Delete logo from the list
  const handleDeleteLogo = (index: number) => {
    const updatedLogos = logos.filter((_, i) => i !== index);
    saveLogos(updatedLogos);
  };

  return (
    <div className="w-full max-w-[1270px] mx-auto flex flex-col items-center gap-5 mb-10">
      <h1 className="text-stone-900 text-2xl font-bold mb-5">Our Alumni Network:</h1>

      <div className="slider-container w-full overflow-hidden">
        <div className="slider">
          <div className="slide-track">
            {logos.concat(logos).map((logo, index) => (
              <div className="slide w-[100px] h-[60px] flex items-center justify-center" key={index}>
                <Image
                  alt={`logo-${index}`}
                  src={logo}
                  className="object-contain"
                  width={100}
                  height={60}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {logos.map((logo, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Image alt={`logo-${index}`} src={logo} className="object-contain" width={100} height={60} />
            <div className="flex gap-2">
              <button onClick={() => handleDeleteLogo(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
              <button onClick={() => setSelectedLogoIndex(index)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <input type="file" accept="image/*" onChange={handleLogoChange} className="mb-2" />
        {selectedLogoIndex !== null ? (
          <button onClick={() => handleUpdateLogo(selectedLogoIndex)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Confirm Update
          </button>
        ) : (
          <button onClick={handleAddLogo} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Logo
          </button>
        )}
      </div>

      <style jsx>{`
        .slider {
          height: 100px;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .slider::before,
        .slider::after {
          position: absolute;
          content: "";
          height: 100%;
          width: 20%;
          z-index: 2;
          pointer-events: none;
        }
        .slider::before {
          left: 0;
          top: 0;
        }
        .slider::after {
          right: 0;
          top: 0;
          transform: rotateZ(180deg);
        }

        .slide-track {
          width: calc(150px * 18);
          display: flex;
          animation: scroll 20s linear infinite;
          justify-content: space-between;
        }
        .slide {
          width: 150px;
          height: 100px;
          display: grid;
          place-items: center;
          transition: 0.5s;
          cursor: pointer;
        }
        .slide:hover {
          transform: scale(0.8);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(calc(-150px * 10));
          }
        }

        @keyframes scroll2 {
          0% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(calc(-150px * 5));
          }
        }

        @media screen and (max-width: 768px) {
          .slide-track {
            width: calc(80px * 20);
          }

          .slide {
            width: 80px;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0px);
            }
            100% {
              transform: translateX(calc(-80px * 10));
            }
          }

          @keyframes scroll2 {
            0% {
              transform: translateX(0px);
            }
            100% {
              transform: translateX(calc(-80px * 5));
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Alumni;
