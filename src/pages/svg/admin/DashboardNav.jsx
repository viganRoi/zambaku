import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from './LoginModal';

const DashboardNav = ({ selected, setSelected }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        setShowModal(false);
        logout();
        navigate('/login');
    };


    return (
        <nav className="flex flex-col gap-2 p-4 ">
            <img onClick={() => navigate('/')} src="/assets/icons/logo.png" alt="" className='mb-8 cursor-pointer' />
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('profile')}
            >
                Profile
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'users' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('users')}
            >
                Users
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'projects' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('projects')}
            >
                Projects
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'createProject' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('createProject')}
            >
                Create Project
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'updateProject' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('updateProject')}
            >
                Update Project
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'deleteProject' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('deleteProject')}
            >
                Delete Project
            </button>
            {/* <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'blogs' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('blogs')}
            >
                Blogs
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'createBlog' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('createBlog')}
            >
                Create Blog
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'updateBlog' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('updateBlog')}
            >
                Update Blog
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded ${selected === 'deleteBlog' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('deleteBlog')}
            >
                Delete Blog
            </button> */}
            <button
                className={`border border-black text-left px-4 py-2 rounded text-nowrap ${selected === 'jobs' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('jobs')}
            >
                Job Openings
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded text-nowrap ${selected === 'createJob' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('createJob')}
            >
                Create Job Opening
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded text-nowrap ${selected === 'deleteJob' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected('deleteJob')}
            >
                Delete Job Opening
            </button>
            <button
                className={`border border-black text-left px-4 py-2 rounded hover:bg-gray-200`}
                onClick={handleLogout}
            >
                Logout
            </button>
            <LoginModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
            />
        </nav>
    )
}

export default DashboardNav