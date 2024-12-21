import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AddEditBlog from './AddEditBlog';

function ViewBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [summary, setSummary] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const navigate = useNavigate();

    const stripMarkdown = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/_(.*?)_/g, "$1")
          .replace(/\[(.*?)\]\(.*?\)/g, "$1")
          .replace(/`(.*?)`/g, "$1")
          .replace(/#+\s/g, "")
          .replace(/>\s/g, "")
          .replace(/\n/g, " ");
      };

    const getBlogDetails = async() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:4000/api/getBlog/${id}`,
            headers: {},
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setTitle(response.data.title);
                setDetails(response.data.details);
                setSummary(response.data.summary);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    const onClose = () => {
        setIsDialogOpen(false);
    }

    useEffect(() => {
        getBlogDetails();
    }, );

    const deleteBlog = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:4000/api/deleteBlog/${id}`,
            headers: {},
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='w-[100vw] min-h-[100vw] p-5'>
            {isDialogOpen &&
                <div><AddEditBlog isEditing={true} onClose={onClose} blogId={id}/></div>
            }
            <div className='bg-gray-200 rounded-md p-4'>
                <div className='flex justify-between items-center py-5'>
                    <div className='font-bold text-2xl uppercase'>{title}</div>
                    <div className='flex gap-3'>
                        <div className='px-3 py-2 border border-black rounded-md font-bold' onClick={() => { setIsDialogOpen(true) }}>Edit Blog</div>
                        <div className='px-3 py-2 border border-black rounded-md font-bold' onClick={() => { deleteBlog() }}>Delete Blog</div>
                    </div>
                </div>
                <div className='w-full p-2 bg-gray-100 border border-gray-300 '>
                    <div className='font-bold'>Summary:</div>
                    <div className='italics font-semibold'>{stripMarkdown(summary)}</div>
                </div>
                <div className='my-2 '>{stripMarkdown(details)}</div>
            </div>

        </div>
    )
}

export default ViewBlog;