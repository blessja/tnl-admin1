"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type Blog = {
    id: string;
    title: string;
    content: string;
    authorName: string;
    publishedDate: string;
    categories: string;
    language: string;
    blogImage:string;
    authorImage:string

  };
  interface BlogsProps {
    blogsData: any[]; 
    updateHandler: (id: string) => void;
    deleteHandler: (id: string) => void;
  }
  

  const Blogs: React.FC<BlogsProps> = ({ blogsData, updateHandler, deleteHandler })=>{
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
 

  return (
     <div className="flex flex-col justify-center items-center p-8 gap-y-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">List of Blogs</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           
                        {blogsData?.length>0 && blogsData?.map((article:any) => (
                            <div key={article._id} className="bg-white shadow-md">
                                <Image src={article?.image} alt="Blog" className="w-full h-[400px] object-cover" width={1000} height={500}/>
                                <div className="p-4">
                                    <div className="flex items-center mb-4">
                                        <img src={article?.author?.profileImage} alt="Author" className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-4" />
                                        <div>
                                            <h3 className="text-xs sm:text-sm font-semibold">{article?.author?.name}</h3>
                                            <p className="text-xs text-gray-500">{(article?.publishedDate)}</p>
                                        </div>
                                    </div>
                                    <h4 className="text-base sm:text-lg font-semibold mb-2">{article?.title}</h4>
                                    <p className="text-xs sm:text-sm text-gray-700 mb-4">{(article.content)}</p>
                                    <div className="flex gap-6 mt-20">
                                        <button
                                            onClick={()=>updateHandler(article?._id)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                             onClick={()=>deleteHandler(article?._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-green-600"
                                        >
                                            Delete
                                        </button>
                                        </div>
                                </div>
                            </div>
                        ))}
                    </section>

     </div>
  );
};

export default Blogs;
