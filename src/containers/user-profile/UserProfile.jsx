import React, { useEffect, useState } from 'react';
import "./UserProfile.scss";
import { Profile } from '../../components';
import { useSelector } from "react-redux";
import userService from "../../_services/userService";

function UserProfile() {
  //HOOKS
  const [profile, setProfile] = useState({});
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    viewMyProfile(authState.userInfo.id);
  }, []);

  const viewMyProfile = async (id) => {
    try{
      const response = await userService.viewMyProfile(id);
      console.log(response);
      setProfile(response);
    }catch(error){
      console.log(error);
    };
  };

  return (
    <div className='UserProfile'>
      <h1>Perfil Usuario</h1>
      <Profile profile={profile}/>
    </div>
  )
}

export default UserProfile;
