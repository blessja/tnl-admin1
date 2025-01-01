"use client"
import { useState, useEffect, useRef } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import Blogs from "./BlogsPage";
import { useAddBlogsMutation, useDeleteBlogsMutation,
  useGetAllBlogsQuery,
  useUpdateBlogsMutation} from "@/Store/apiSlice";
const Page = () => {
  const categories = [  "Cultural Insight",
    "Festival & Celebration",
    "Language & Technology",
    "Music & Art",
    "Travel & Exploration",
    "Current Events & News",
    "Motivation & Mindset",
    "Others"];
  const languages = [
    "English",
    "French",
    "Mandarin",
    "Spanish",
    "German",
    "Korean",
    "Japanese",
  ];
 
 
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef(null);
  const authimageRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [blogContent, setBlogContent] = useState("")
  const [title, settitle] = useState("")
  const [authorImage, setAuthorImage] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string>("Cultural Insight");

  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  
  const [addBlogs, { isLoading: isAdding }] = useAddBlogsMutation();
  const [blogsData,setBlogsData]=useState([])
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value); 
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  
  const handleCategoryToggle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategories(event.target.value)

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
  const handleImageUpload = (e: any) => {
    const { name, files } = e.target;
    showPhoto(e);
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleImageChange = (e: any) => {
    const { name, files } = e.target;
    showPhoto(e);
    if (files && files.length > 0) {
      setAuthorImage(files[0]);
    }

  }
 
  const handleBolgTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settitle(event.target.value)

  }
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
        formData.append("blogImage", image as any);
      }
      if (authorImage) {

        formData.append("authorImage", authorImage as any)
      }

      const response = addBlogs(formData).unwrap();
      console.log('we got it', response)


    } catch (error) {
      console.error("Error updating banner:", error);
    }
    setIsLoading(false);
  }

//  function fetchdata(){
//     useEffect(()=>{
//       const {data}= useGetAllBlogsQuery({language:selectedLanguage})
     
//       console.log("the bbb",data)
//      },[]) 
    
//   }
//   fetchdata()
  const {data}= useGetAllBlogsQuery({language:selectedLanguage})
  //setBlogsData()
  console.log("the bbb",data)
  // setBlogsData(data)

// const handleUpdate=(e)=async()=>{}
// const handleDelete=()=async()=>{}

return (
  <div className="p-4 ml-10">
    <div className="flex   flex-col gap-10">
      <p className="text-2xl font-bold">Blogs:</p>
      <div>
        <div className="flex flex-col mt-2">
          <label className="block text-gray-700 font-bold mb-2 ">Blog Title:</label>
          <input
            type="text"
            name="blog title"
            onChange={handleBolgTitleChange}
            className="block border rounded p-2 w-full"
            placeholder="Enter blog title"
            value={title}


          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="block text-gray-700 font-bold mb-2 ">Blog Content:</label>

          <RichTextEditor
            value={blogContent}
            onChange={(value) => setBlogContent(value)}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="block text-gray-700 font-bold mb-2 ">Blog Image:</label>
          <input
            ref={imageRef}
            type="file"
            name="blogImage"
            id="blogImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            type="button"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => document.getElementById("blogImage")?.click()}
          >
            Choose Image
          </button>
          {selectedImage && (
              <img
                src={selectedImage}
                alt="Blog Preview"
                className="mt-4 w-32 h-32 object-cover rounded"
              />
            )}
        </div>

        <div className="flex flex-col mt-2">
          <label className="block text-gray-700 font-bold mb-2 ">Author name:</label>
          <input
            type="text"
            name="Author name"
            onChange={(e) => { setAuthorName(e.target.value) }}
            className="block border rounded p-2 w-full"
            placeholder="Enter Author name"
            value={authorName}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label className="block text-gray-700 font-bold mb-2 ">Author Image:</label>
          <input
            ref={authimageRef}
            type="file"
            name="authorImage"
            id="authorImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded"
            />
          )}
          <button
            type="button"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => document.getElementById("authorImage")?.click()}
          >
            Choose Image
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <label className="block text-gray-700 font-bold mb-2 ">Language:</label>
          <select
            name="language"
            onChange={handleLanguageChange}
            className="block border rounded p-2 "
            value={selectedLanguage}
          >
            <option value="" disabled>Select a language</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mt-2">
          <label className="block text-gray-700 font-bold mb-2 ">Category:</label>
          <select
            name="categories"
            onChange={handleCategoryToggle}
            className="block border rounded p-2 "
            value={selectedCategories}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mt-2 ">
          <label className="block text-gray-700 font-bold mb-2 mt-5 ">Published Date:</label>
          <input
            type="date"
            name="publishedDate"
            onChange={handleDateChange}
            className="block border rounded p-2"
            value={selectedDate}
          />
        </div>

      </div>
    </div>
    <div className="flex gap-6 mt-20">
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create
      </button>
    </div>
   
     <Blogs 
   // blogsData={blogsData}
        
        // deleteHandler={handleDelete}
        // updateHandler={handleUpdate}
        
        />
  </div>
);
};

export default Page;
