"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CofoundersProps {
  cftitle: string;
  cfname: string;
  cfdescription: string;
  cfimage: string; // URL string for the image
}

const Cofounders: React.FC<CofoundersProps> = ({
  cftitle,
  cfname,
  cfdescription,
  cfimage,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    // Update the screen size state on initial load and window resize
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set the initial state based on the window size
    updateIsMobile();

    // Add event listener to handle window resize
    window.addEventListener("resize", updateIsMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const descriptionWords = cfdescription.split(" ");
  const isDescriptionLong = descriptionWords.length > 20;

  return (
    <div
      className="flex flex-col justify-center items-center p-8 gap-y-10"
      style={{
        background: "linear-gradient(to bottom, rgba(117, 117, 117, 0.5), #F6F3F3)",
      }}
    >
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col md:flex-row gap-9 justify-center items-center">
          {cfimage && (
            <Image
              src={cfimage}
              alt={cfname}
              width={150}
              height={150}
              className="w-100 h-100 md:w-auto md:h-auto"
            />
          )}
          <div className="flex flex-col gap-y-4 md:gap-y-7 max-w-lg">
            <p className="text-2xl md:text-4xl font-bold mb-7 md:hidden">{cftitle}</p>
            <p className="text-2xl md:text-4xl font-bold">{cfname}</p>
            
            {/* Description with conditional 'Read More' */}
            <p className="text-sm md:text-base leading-relaxed mt-4">
              {isDescriptionLong && !showFullDescription && isMobile
                ? `${descriptionWords.slice(0, 20).join(" ")}...`
                : cfdescription}
            </p>

            {isDescriptionLong && isMobile && (
              <button
                onClick={handleToggleDescription}
                className="h-[48px] sm:h-[58px] px-4 sm:px-8 py-2 sm:py-3.5 rounded-lg border border-teal-600 justify-center items-start gap-2.5 inline-flex mt-2 md:hidden"
              >
                <div className="text-center text-teal-600 text-lg sm:text-2xl font-medium">
                  {showFullDescription ? "Read Less" : "Read More"}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cofounders;
