"use client";
import { useState, useEffect, useRef } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import Blogs from "./BlogsPage";
import {
  useAddBlogsMutation,
  useDeleteBlogsMutation,
  useGetAllBlogsQuery,
  useUpdateBlogsMutation
} from "@/Store/apiSlice";

const Page = () => {
  const categories = [
    "Cultural Insight",
    "Festival & Celebration",
    "Language & Technology",
    "Music & Art",
    "Travel & Exploration",
    "Current Events & News",
    "Motivation & Mindset",
    "Others",
  ];
  const languages = [
    "English",
    "French",
    "Mandarin",
    "Spanish",
    "German",
    "Korean",
    "Japanese",
  ];


  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [blogContent, setBlogContent] = useState("");
  const [title, setTitle] = useState("");
  const [authorImage, setAuthorImage] =  useState<File | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string>("Cultural Insight");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [addBlogs,] = useAddBlogsMutation();
  const { data:blogsData } = useGetAllBlogsQuery({ language: selectedLanguage });
  const [updateBlogs,] = useUpdateBlogsMutation();
  const [isLoading, setIsLoading] = useState(false);


  const[deleteQuery,{ isLoading: isDelteing }]=useDeleteBlogsMutation();
   
 
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };
  const handleCategoryToggle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategories(event.target.value);
  };
  const showPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
  

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    showPhoto(e);
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    showPhoto(e);
    if (files && files.length > 0) {
      setAuthorImage(files[0]);
    }
  };
  const handleBlogTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("language", selectedLanguage);
      formData.append("content", blogContent);
      formData.append("authorName", authorName);
      formData.append("categories", selectedCategories);
      formData.append("publishedDate", selectedDate);
      if (image) {
        formData.append("blogImage", image);
      }
      if (authorImage) {
        formData.append("authorImage", authorImage);
      }

      const response = await addBlogs(formData).unwrap();
      console.log("Blog added:", response);
      setTitle("");
      setSelectedLanguage("English");
      setBlogContent("");
      setAuthorName("");
      setSelectedCategories("Cultural Insight");
      setSelectedDate("");
      setImage(null);
      setAuthorImage(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
    setIsLoading(false);
  };
 
  const handleUpdate = async (id: string, updatedData: any) => {
    setIsLoading(true);
    try {
      
      const formData = new FormData();
      formData.append("title", updatedData.title || "");
      formData.append("slug", updatedData.slug || updatedData.title || "");
      formData.append("language", updatedData.language || "");
      formData.append("content", updatedData.content || "");
      formData.append("authorName", updatedData.author?.name || "");
      formData.append("categories", updatedData.categories || "");
      formData.append("publishedDate", updatedData.publishedDate || "");
  
      if (updatedData.image) {
        formData.append("blogImage", updatedData.image as any);
      }
      if (updatedData.author.profileImage) {
        formData.append("authorImage", updatedData.author.profileImage as any);
      }
  
     
  
      const response = await updateBlogs({ id, formData }).unwrap();
      console.log("Blog updated:", response);
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async(id: string) => {
    try{
      const response=await deleteQuery(id).unwrap();

    } catch(error){
      console.log("the error is",error)
    }
   
    console.log(`Delete blog with ID: ${id}`);
  };
  if (isLoading ) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loader">Loading...</div>{" "}
      </div>
    );
  }
  return (
    <div className="flex justify-center  flex-col items-center min-h-screen">
      <div className="w-full max-w-3xl bg-white  rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Create a Blog</h1>
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Blog Title:</label>
            <input
              type="text"
              onChange={handleBlogTitleChange}
              className="block w-full border rounded p-2"
              placeholder="Enter blog title"
              value={title}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Blog Content:</label>
            <RichTextEditor
              value={blogContent}
              onChange={(value) => setBlogContent(value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Blog Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block"
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Blog Preview"
                className="mt-4 w-32 h-32 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Author Name:</label>
            <input
              type="text"
              onChange={(e) => setAuthorName(e.target.value)}
              className="block w-full border rounded p-2"
              placeholder="Enter author name"
              value={authorName}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Author Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Language:</label>
            <select
              onChange={handleLanguageChange}
              className="block w-full border rounded p-2"
              value={selectedLanguage}
            >
              <option value="" disabled>
                Select a language
              </option>
              {languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Category:</label>
            <select
              onChange={handleCategoryToggle}
              className="block w-full border rounded p-2"
              value={selectedCategories}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Published Date:</label>
            <input
              type="date"
              onChange={handleDateChange}
              className="block w-full border rounded p-2"
              value={selectedDate}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create
          </button>
        </div>
       
      </div>
      <Blogs blogsData={blogsData}  
        updateHandler={handleUpdate}
        deleteHandler={handleDelete}/>
    </div>
  );
};

export default Page;
