import React, { useState } from "react";

interface Author {
  name: string;
  profileImage: string|File;
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

interface ModalProps {
  blog: Blog;
  onClose: () => void;
  onSubmit: (updatedBlog: Blog) => void;
}

const Modal: React.FC<ModalProps> = ({ blog, onClose, onSubmit }) => {
  const [updatedBlog, setUpdatedBlog] = useState<Blog>({
    ...blog,
    publishedDate: blog.publishedDate?.split("T")[0] || "",
    categories: Array.isArray(blog.categories) ? blog.categories[0] : blog.categories || "",
    author: blog.author || { name: "", profileImage: "" },
    image: blog.image || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "authorName") {
      setUpdatedBlog((prevBlog) => ({
        ...prevBlog,
        author: {
          ...prevBlog.author,
          name: value,
        },
      }));
    } else {
      setUpdatedBlog((prevBlog) => ({
        ...prevBlog,
        [name]: value,
      }));
    }
  };

  const handleAuhtorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {  files } = e.target;
    const file = files?.[0] || null;


   
      setUpdatedBlog((prevBlog) => ({
        ...prevBlog,
        author: {
          ...prevBlog.author,
          profileImage: file || prevBlog.author.profileImage,
        },
      }));
    
   
  };
  const handleBlogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0] || null;
  
      setUpdatedBlog((prevBlog) => ({
        ...prevBlog,
        image: file || prevBlog.image,
      }));
    
  };

  const handleSubmit = () => {
    onSubmit(updatedBlog);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white p-8 rounded-lg w-full max-w-6xl">
        <h2 className="text-xl font-bold mb-4 text-center">Update Blog</h2>
        
      
        <div className="grid grid-cols-3 gap-6">
     
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={updatedBlog.title}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Language</label>
              <input
                type="text"
                name="language"
                value={updatedBlog.language}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Category</label>
              <select
                name="categories"
                value={updatedBlog.categories}
                onChange={(e) =>
                  setUpdatedBlog({ ...updatedBlog, categories: e.target.value })
                }
                className="w-full border rounded p-2"
              >
                <option value="Cultural Insight">Cultural Insight</option>
                <option value="Festival & Celebration">Festival & Celebration</option>
                <option value="Language & Technology">Language & Technology</option>
                <option value="Music & Art">Music & Art</option>
                <option value="Travel & Exploration">Travel & Exploration</option>
                <option value="Current Events & News">Current Events & News</option>
                <option value="Motivation & Mindset">Motivation & Mindset</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Published Date</label>
              <input
                type="date"
                name="publishedDate"
                value={updatedBlog.publishedDate}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

     
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Author Name</label>
              <input
                type="text"
                name="authorName"
                value={updatedBlog.author.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Author Image</label>
              <input
                type="file"
                name="authorImage"
                onChange={handleAuhtorImageChange}
                className="w-full border rounded p-2"
              />
              {typeof updatedBlog.author.profileImage === "string" && updatedBlog.author.profileImage && (
                <img
                  src={updatedBlog.author.profileImage}
                  alt="Author"
                  className="mt-2 max-h-32"
                />
              )}
            </div>
          </div>

      
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Blog Image</label>
              <input
                type="file"
                name="blogImage"
                onChange={handleBlogImageChange}
                className="w-full border rounded p-2"
              />
              {typeof updatedBlog.image === "string" && updatedBlog.image && (
                <img
                  src={updatedBlog.image}
                  alt="Blog"
                  className="mt-2 max-h-32"
                />
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Content</label>
              <textarea
                name="content"
                value={updatedBlog.content}
                onChange={handleChange}
                className="w-full border rounded p-2"
                rows={6}
              />
            </div>
          </div>
        </div>

      
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
