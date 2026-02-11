import React, { useEffect, useState } from "react";
import Default_profile_pic from '../../images/defaultprofilepic.jpg'

import { Pencil } from "lucide-react";

function Profile_Picture({ avatar, onChange }) {
 
  const [preview, setPreview] = useState("");
  console.log(preview)
  useEffect(() => {
    if(avatar){
      setPreview(avatar)
    }
  
    
  }, [avatar])
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);

    onChange(file);
  };
  return (
    <div className="relative w-32 h-32 mx-auto">
      <img
        src={preview || Default_profile_pic}
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
        alt=""
      />
      

      <input
        type="file"
        id="avatarUpload"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Pencil Icon */}
      <label
        htmlFor="avatarUpload"
        className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white shadow cursor-pointer hover:bg-blue-700 transition"
      >
        <Pencil size={16} />
      </label>
    </div>
  );
}

export default Profile_Picture;
