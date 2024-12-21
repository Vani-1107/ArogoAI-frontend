import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddEditBlog from "./AddEditBlog";

function HomePage() {
  const stripMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/#+\s/g, "")
      .replace(/>\s/g, "")
      .replace(/\n/g, " ");
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);

  const onClose = () => {
    setIsDialogOpen(false);
  };

  const getBlogs = async () => {
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
        setAllBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] p-4">
      {isDialogOpen && (
        <div>
          <AddEditBlog
            isEditing={false}
            onClose={onClose}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      )}
      <div className="w-full h-full bg-gray-100 rounded-md pb-4">
        <div className="p-4 flex justify-between items-center">
          <div className="text-3xl font-bold">All Blogs</div>
          <div
            className="py-2 px-4 font-bold border border-black rounded-md cursor-pointer"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <span className="text-xl">+</span> Add Blog
          </div>
        </div>
        <div className="my-3 h-[2px] w-full bg-gray-400"></div>
        <div className="p-4">
          {allBlogs?.map((blog) => (
            <Link to={`/viewBlog/${blog._id}`}>
              <div
                key={blog._id}
                className="p-4 shadow border-gray-300 border-b-2 w-full bg-gray-100 hover:bg-gray-200"
              >
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-700">
                  {" "}
                  {`${stripMarkdown(blog.summary).slice(0, 300)}... `}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
