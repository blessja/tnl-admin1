"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "./Modal";
import DOMPurify from "dompurify";

interface Author {

  name: string;
  profileImage:string|File;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: Author; 
  publishedDate: string;
  categories: string;
  language: string;
  image: string|File;
}


interface BlogsProps {
  blogsData: Blog[];
  updateHandler: (id: string, updatedData: Blog) => void;
  deleteHandler: (id: string) => void;
}

const Blogs: React.FC<BlogsProps> = ({ blogsData, updateHandler, deleteHandler }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleOpenModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
    setShowModal(false);
  };

  const handleModalSubmit = (updatedBlog: Blog) => {
    if (updatedBlog) {
      updateHandler(updatedBlog._id, updatedBlog);
    }
    handleCloseModal();
  };
  const getImageSrc = (image: string | File) => {
    if (typeof image === "string") {
      return image;
    }
    if (image instanceof File) {
      return URL.createObjectURL(image); 
    }
    return "";
  };
  
  const sanitizeAndRender = (content:any) => {
    const cleanContent = DOMPurify.sanitize(content);
    return <div dangerouslySetInnerHTML={{ __html: cleanContent }} />;
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 gap-y-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">List of Blogs</h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {blogsData?.length > 0 &&
          blogsData?.map((article: Blog) => (
            <div key={article._id} className="bg-white shadow-md">
                
               {article.image && (
                <Image
                  src={getImageSrc(article.image)}
                  alt="Blog"
                  className="w-full h-[300px] object-cover"
                  width={500}
                  height={50}
              
                />
              )}
              <div className="p-4">
                <div className="flex items-center mb-4">
                {article.author.profileImage && (
                <Image
                  src={getImageSrc(article.author.profileImage)}
                  alt="Author"
                  width={150}
                  height={50}
                 className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-4"
             

                />
              )}
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold">{article.author.name}</h3>
                    <p className="text-xs text-gray-500">{article.publishedDate}</p>
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-2">{article?.title}</h4>
                <p className="text-xs sm:text-sm text-gray-700 mb-4">  {sanitizeAndRender(article?.content)}</p>
                <div className="flex gap-6 mt-20">
                  <button
                    onClick={() => handleOpenModal(article)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteHandler(article._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </section>

      {showModal && selectedBlog && (
        <Modal
          blog={selectedBlog}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default Blogs;
