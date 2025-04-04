import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileHeader from '../../components/ProfileComponent/ProfileHeader';
import UserDetails from '../../components/ProfileComponent/ShowUserDetails';
import Skills from '../../components/ProfileComponent/Skills';
import Posts from '../../components/ProfileComponent/Post';
import { blogService } from '../../services/blogService';
import { userService } from '../../services/userServices';
import About from '../../components/ProfileComponent/About';
import { FaEdit, FaUserGraduate, FaMapMarkerAlt, FaBriefcase, FaUsers } from 'react-icons/fa';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const { user: passedUser } = location.state || {};
    const loggedInUserId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const allPosts = await blogService.getBlog();
                const filteredPosts = allPosts.filter(post => post.user.id === passedUser?.id);
                setPosts(filteredPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const userDetails = await userService.getDetailsUserById(passedUser?.id);
                setUser(userDetails);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (passedUser) {
            setUser(passedUser);
            fetchUserDetails();
            fetchPosts();
        }
    }, [location.state]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedUser) => {
        try {
            const response = await userService.updateUser(updatedUser);
            setUser(response);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    const isOwnProfile = loggedInUserId && loggedInUserId === passedUser?.id;
    return (
        <section className="mt-10">
            <div className="max-w-full mx-auto mt-6 p-4 bg-gray-100 rounded-lg shadow-lg">
                {isOwnProfile && !isEditing && (
                    <div className='absolute top-10 right-8'>
                    <button
                        onClick={handleEditClick}
                        className="flex items-center bg-gray-400 text-white px-2 py-2 rounded-md mb-6 mt-10"
                    >
                        <FaEdit className="mr-2" /> Edit Profile
                    </button>
                    </div>
                )}

               

                {isEditing ? (
                    <EditProfileForm detailuser={user} onSave={handleSave} />
                ) : (
                    <>
                    
                        <ProfileHeader
                            coverPhoto={""}
                            profilePicture={user?.profilePictureUrl}
                            name={user?.name}
                            headline={passedUser?.headline}
                            isOwnProfile={isOwnProfile}
                        />
                       
                        <UserDetails
                            college={user?.college}
                            location={user?.address}
                            role={user?.role}
                            id={user?.id}
                            imageUrl={user?.profilePictureUrl}
                            headline={passedUser?.headline}
                        />
                        <About bio={user?.bio} />
                        <Posts posts={posts} />
                        <Skills skills={user?.skills} />
                    </>
                )}
            </div>
        </section>
    );
};

// Sample EditProfileForm Component
const EditProfileForm = ({ detailuser, onSave }) => {
    const [formData, setFormData] = useState({
        name: detailuser.name || "",
        bio: detailuser.bio || "",
        industry: detailuser.industry || "",
        address: detailuser.address || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full rounded-md"
                />
            </div>
            <div>
                <label>Bio:</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full rounded-md"
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full rounded-md"
                />
            </div>
            <div>
                <label>Industry:</label>
                <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full rounded-md"
                />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                Save
            </button>
        </form>
    );
};

export default ProfilePage;
