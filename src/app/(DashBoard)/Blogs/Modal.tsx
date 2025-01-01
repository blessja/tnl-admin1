
import React, { useState } from "react";

interface Author {
  name: string;
  profileImage: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: Author;
  publishedDate: string;
  categories: string;
  language: string;
  image: string;
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
    } else if (name === "authorImage") {
      setUpdatedBlog((prevBlog) => ({
        ...prevBlog,
        author: {
          ...prevBlog.author,
          profileImage: value,
        },
      }));
    } else {
      setUpdatedBlog((prevBlog) => ({
        ...prevBlog,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setUpdatedBlog((prevBlog) => ({
      ...prevBlog,
      categories: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(updatedBlog);
  };

  return (

    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
  <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
    <h2 className="text-xl font-bold mb-6 text-center">Update Blog</h2>

    <div className="grid grid-cols-2 gap-6">
      {/* Title */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={updatedBlog.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Language */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">Language</label>
        <input
          type="text"
          name="language"
          value={updatedBlog.language}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Content */}
      <div className="col-span-2">
        <label className="block text-gray-700 font-bold mb-2">Content</label>
        <textarea
          name="content"
          value={updatedBlog.content}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Author Name */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">Author Name</label>
        <input
          type="text"
          name="authorName"
          value={updatedBlog.author.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Author Image */}
      {/* <div>
        <label className="block text-gray-700 font-bold mb-2">Author Image (URL)</label>
        <input
          type="text"
          name="authorImage"
          value={updatedBlog.author.profileImage}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div> */}

      {/* Blog Image */}
      {/* <div>
        <label className="block text-gray-700 font-bold mb-2">Blog Image (URL)</label>
        <input
          type="text"
          name="blogImage"
          value={updatedBlog.image}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div> */}

      {/* Category */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">Category</label>
        <select
          name="categories"
          value={updatedBlog.categories}
          onChange={handleCategoryChange}
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

      {/* Published Date */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">Published Date</label>
        <input
          type="date"
          name="publishedDate"
          value={updatedBlog.publishedDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
    </div>

    {/* Buttons */}
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
