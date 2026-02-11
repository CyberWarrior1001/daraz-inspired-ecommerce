import Profile_Picture from "@/components/profile_components/Profile_Picture";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useUIStore from "@/store/uiStore";

function ProfilePage() {
  const { uid } = useParams();
  const [isloading, setisLoading] = useState({
    ProfilePic : false,
    updateProfile : false,
    pageLoading: false
    

  });
  
  const [avatarFile, setAvatarFile] = useState();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    profilePic: "",
    gender: "male",
    role: "buyer",
  });

  const {setuserRole} = useUIStore()


  // uploadAvatar handler
  const uploadAvatar = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    setisLoading(prev => ({...prev, ProfilePic: true}));
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/upload/profile/pic",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAvatarFile(`http://localhost:3000/${res.data.path}`);
      setisLoading(prev => ({...prev, ProfilePic: false}));
      toast.success("Photo uploaded successfully!");
      toast.info("pleas click on edit to Update in DB.");
      setformData((prev) => ({
        ...prev,
        profilePic: `http://localhost:3000/${res.data.path}`,
      }));
    } catch (error) {
      console.log(error);
      setisLoading(prev => ({...prev, ProfilePic: false}));
      toast.error("Error occur while uploading profile pic")
      console.log("Error from upload avatar");
    }
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Loading profile 
  useEffect(() => {
    const getProfileInfo = async () => {
      setisLoading(prev => ({ ...prev, pageLoading: true }));
      try {
        const res = await axios.get(
          "http://localhost:3000/api/users/getProfile",
          { withCredentials: true }
        );
        setisLoading(prev => ({ ...prev, pageLoading: false }));

        if (res.data.success) {
          const user = res.data.user;

          setformData({
            name: user.name || "",
            email: user.email || "",
            phonenumber: user.phonenumber || "",
            address: user.address || "",
            profilePic: user.profilePic || "",
            gender: user.gender || "male",
            role: user.role || "buyer",
          });
          setAvatarFile(user.profilePic);
          setuserRole(user.role)
          console.log("this is user profile pic", user.profilePic);
        }
      } catch (error) {
        console.log(error);
        setisLoading(prev => ({ ...prev, pageLoading: false }));
        console.log("This error is from profile info gather useeffect");
      }
    };
    getProfileInfo();
  }, []);


  // Profile update handler
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setisLoading(prev => ({ ...prev, updateProfile: true }));
    try {
      const res = await axios.put(
        "http://localhost:3000/api/users/updateProflie",
        formData,
        { withCredentials: true }
      );
      setisLoading(prev => ({ ...prev, updateProfile: false }));
      toast.success("Profile updated successfully!")
    } catch (error) {
      console.log(error);
      setisLoading(prev => ({ ...prev, updateProfile: false }));
      toast.error("Error occur while updating profile")
      console.log("Update profile handler error");
    }
  };
  
  


  if(isloading.pageLoading){
    return <div className="min-h-50 flex justify-center items-center"><Loader2 className="h-10 w-10 animate-spin text-black" /></div>
  }

  return (
    <div className="m-10">
      <div className="min-h-screen">
        <div className="space-y-4 bg-white py-6 rounded-2xl">
          <Profile_Picture
            avatar={avatarFile}
            onChange={(file) => setAvatarFile(file)}
          />
          <div className="flex justify-center items-center">
            <span className="text-4xl">Hi {formData.name}</span>
          </div>
          <button
            onClick={uploadAvatar}
            disabled={isloading.ProfilePic}
            className="mx-auto  bg-green-600 text-white px-4 py-2 rounded-lg  hover:bg-green-700 w-2xs flex justify-center items-center  "
          >
            {isloading.ProfilePic ? (
              <Loader2 className="h-10 w-10 animate-spin text-white" />
            ) : (
              "Save Profile Picture"
            )}
          </button>
        </div>
        {/* Profile section */}
        <div className="my-1.5">
          <div className="bg-white min-h-50 rounded-2xl p-2">
            <div className="grid grid-cols-3 gap-4 ">
              <div className="flex flex-col gap-7">
                <span>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Your Name"
                  />
                </span>

                <span>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter Your Email"
                  />
                </span>
              </div>

              <div className="flex flex-col gap-7">
                <span>
                  <Label htmlFor="phonenumber">Phone Number</Label>
                  <Input
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Your Number"
                  />
                </span>

                <span>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Your Address"
                  />
                </span>
              </div>

              <div className="flex flex-col gap-7">
                <span>
                  <Label htmlFor="number">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setformData((prev) => ({
                        ...prev,
                        gender: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-45">
                      <SelectValue placeholder="Gender"></SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-white text-black">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </span>

                <span>
                  <Label htmlFor="number">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setformData((prev) => ({
                        ...prev,
                        role: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-45">
                      <SelectValue placeholder="Role"></SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-white text-black">
                      <SelectItem value="buyer">Buyier</SelectItem>
                      <SelectItem value="seller">Saler</SelectItem>
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </div>
            <button
              onClick={updateProfileHandler}
              className="mx-auto  bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 m-6 gap-2  w-2xs flex justify-center items-center " disabled={isloading.updateProfile}
            >
              {
                isloading.updateProfile ? <Loader2 className="h-10 w-10 animate-spin text-white" /> :
                <>
                  <span className="font-bold">Edit </span>
                  <Edit size="20px" />
                </>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
