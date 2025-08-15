import React, { useContext, useEffect, useState } from 'react'
import './Profile.css';
import axios from 'axios';
import { UserContext } from '../../context/UserProvider';

const Profile = () => {
    const { getToken } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const baseurl = import.meta.env.VITE_APP_API;
    const token = getToken();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        await axios.get(baseurl + '/api/get-user/' + token, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className='MainProfile'>
            <div className="MainBox">
                <div className="UserProfile">
                    <div className="avatar avatarcss">
                        {user?.profilePicPath ? (
                            <div className="ring-accent ring-offset-base-100 w-50 rounded-full ring-2 ring-offset-2">
                                <img
                                    src={`${baseurl}/${user.profilePicPath}`}
                                    alt="User Profile"
                                    className="rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="skeleton h-50 w-50 rounded-full"></div>
                        )}
                    </div>
                </div>
                <div className="UserDetails">
                    <div className="hero herocss">
                        <div className="hero-content flex-col lg:flex-row-reverse contentcss">
                            <div className='flex flex-col gap-30'>
                                <h1 className="text-5xl font-bold">{user?.username}</h1>
                                <h1 className="text-5xl font-bold">{user?.email}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile