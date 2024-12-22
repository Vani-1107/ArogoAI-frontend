import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEditBlog = ({ onClose, isEditing, blogId, onUpdate }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const getBlogDetails = async () => {
    try {
      const response = await axios.get(
        `https://arogoai-backend.onrender.com/api/getBlog/${blogId}`
      );
      setTitle(response.data.title);
      setDetails(response.data.details);
    } catch (error) {
      console.error(error);
      setError("Failed to load blog details.");
    }
  };

  useEffect(() => {
    if (isEditing) {
      getBlogDetails();
    }
  }, [isEditing, blogId]);

    const getAllBlogs = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://arogoai-backend.onrender.com/api/getAllBlogs",
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          //setAllBlogs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      getAllBlogs();
    }, []);

  const addBlog = async () => {
    if (!title || !details) {
      setError("Title and Details cannot be empty.");
      return;
    }

    try {
      await axios.post("https://arogoai-backend.onrender.com/api/createBlog", {
        title,
        details,
      });
      onClose();
      window.location.reload();
      getAllBlogs();
      
      navigate("/"); 
    } catch (error) {
      console.error(error);
      setError("Failed to add the blog.");
    }
  };

  const editBlog = async () => {
    if (!title || !details) {
      setError("Title and Details cannot be empty.");
      return;
    }

    try {
      await axios.put(`https://arogoai-backend.onrender.com/api/editBlog/${blogId}`, {
        title,
        details,
      });
      onClose();
      if (onUpdate) onUpdate(); 
      navigate(`/viewBlog/${blogId}`);
    } catch (error) {
      console.error(error);
      setError("Failed to update the blog.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg w-[90vw] min-h-fit md:w-1/2 md:min-h-1/2 h-fit shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Edit Blog" : "Add Blog"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="flex flex-col gap-4">
          <label>
            <span className="block text-gray-700">Title</span>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span className="block text-gray-700">Details</span>
            <textarea
              className="w-full p-2 border rounded h-32"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </label>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                if (!isEditing) addBlog();
                else editBlog();
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;
