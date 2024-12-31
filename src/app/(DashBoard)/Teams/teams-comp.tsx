import React from "react";
import Image from "next/image";

interface TeamsProps {
    image: string | File | null; // Single image URL
    isMobile: boolean; // Prop to determine if it's mobile view
}

const Teams: React.FC<TeamsProps> = ({ image, isMobile }) => {
    let imageUrl: string;
    
    if (typeof image === "string") {
        imageUrl = image;
    } else if (image instanceof File) {
        imageUrl = URL.createObjectURL(image);
    } else {
        imageUrl = '';
    }

    if(window.innerWidth > 700){
        isMobile = false;
    } else {
        isMobile = true;
    }
    return (
        <div className="flex flex-col m-8 justify-center items-center gap-y-10">
            <div className="relative w-full overflow-hidden">
                <div
                    className={`flex gap-4 justify-center items-center p-4`}
                >
                    <Image src={imageUrl} alt="Team Member" width={150} height={150} />

                    {isMobile && (
                        <>
                            <Image src={imageUrl} alt="Team Member" width={150} height={150} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teams;
