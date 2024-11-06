import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileHeader from '../../components/ProfileComponent/ProfileHeader';
import UserDetails from '../../components/ProfileComponent/ShowUserDetails';
import Skills from '../../components/ProfileComponent/Skills';
import Posts from '../../components/ProfileComponent/Post';
import { blogService } from '../../services/blogService';
import { userService } from '../../services/userServices';
import About from '../../components/ProfileComponent/About';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  // To control editing mode
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const { user: passedUser } = location.state || {};  // Get profile data
    const loggedInUserId = localStorage.getItem('userId');

    // Add dependency for the location to re-fetch data on re-navigation
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
                console.log("Fetched User Details:", userDetails);  // Check if bio and address exist
                setUser(userDetails);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (passedUser) {
            setUser(passedUser);  // Set passed user if available
            fetchUserDetails();
            fetchPosts();
        }
    }, [location.state]);  // Update useEffect to run when location state changes

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedUser) => {
        try {
            const response = await userService.updateUser(updatedUser);  // Make API call to save the updated user
            setUser(response);
            setIsEditing(false);  // Exit edit mode
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    const isOwnProfile = loggedInUserId && loggedInUserId === passedUser?.id;
    return (
        <section className="mt-10">
            <div className="max-w-full mx-auto mt-6">
                {isOwnProfile && !isEditing && (
                    <button
                        onClick={handleEditClick}
                        className="bg-[#d27511] text-white pr-2 py-2 rounded-md mb-6 mt-10"
                    >
                        Edit Profile
                    </button>
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
                        />
                        <UserDetails
                            college={user?.college}
                            location={user?.address}
                            industry={user?.industry}
                            connections={user?.connections}
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
        onSave(formData);  // Save the updated data in parent component
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full"
                />
            </div>
            <div>
                <label>Bio:</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full"
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full"
                />
            </div>
            <div>
                <label>Industry:</label>
                <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full"
                />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                Save
            </button>
        </form>
    );
};

export default ProfilePage;
