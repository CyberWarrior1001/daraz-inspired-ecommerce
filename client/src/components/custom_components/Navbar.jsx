import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import logo from "../../images/darazlogo.png";
import {
  Search,
  ShoppingCartIcon,
  Menu,
  X,
  User,
  Star,
  Package,
  LogOut,
  LayoutDashboardIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import useUIStore from "@/store/uiStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";


function Navbar() {
  const [open, setOpen] = useState(false);
  const { openLogin, openSignup, setUname, logout } = useUIStore();
  const isLogedin = useUIStore((state) => state.isLogedin);
  const uname = useUIStore((state) => state.uname);
  const uid = useUIStore((state) => state.uid);
  const userRole = useUIStore((state) => state.userRole);
  const numberOfCarts = useUIStore((state) => state.numberOfCarts)
  const [searchQuery, setSearchQuery] = useState("")
  
  console.log(userRole);

  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/api/users/logout", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        logout();
        setUname("");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault()
    console.log(searchQuery)
    navigate(`/products?query=${searchQuery}`)
    
  }





  return (
    <div className="w-full sticky top-0 bg-[#f85606] px-3 md:px-[5%] py-2 z-50 navbar">
      <div className="flex justify-end items-center text-white text-[12px] font-bold">
        <div className="hidden md:flex gap-6">
          <Link to="/allStores" className="link">SHOP ALL SHOPS</Link>
          <Link className="link">SELL ON DARAZ</Link>
          <Link className="link">HELP & SUPPORT</Link>
          {isLogedin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="link">{uname.toUpperCase()}</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-40 bg-white text-black border-none"
                align="start"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to={`/profile/${uid}`}>Profile</Link>
                    <DropdownMenuShortcut>
                      <User />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  {userRole == "seller" && (
                    <DropdownMenuItem>
                      <Link to={`/admin/${uid}`}>Dashboard</Link>
                      <DropdownMenuShortcut>
                        <LayoutDashboardIcon />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    My Orders
                    <DropdownMenuShortcut>
                      <Package />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    My Reviews
                    <DropdownMenuShortcut>
                      <Star />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button className="link" onClick={logoutHandler}>Log Out</button>
                    <DropdownMenuShortcut>
                      <LogOut />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <button className="link" onClick={openLogin}>LOGIN</button>
              <button className="link" onClick={openSignup}>SIGN UP</button>
            </>
          )}
          <Link className="link">زبان تبدیل کریں</Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${
              open
                ? "max-h-60 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            }`}
      >
        <div className="md:hidden  bg-[#f85606] text-white text-sm font-bold flex flex-col items-center gap-3 mt-3 p-3 border-t border-white/20 ">
          <Link>Save More on App</Link>
          <Link>Sell on Daraz</Link>
          <Link>Help & Support</Link>
          {isLogedin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>{uname.toUpperCase()}</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-40 bg-white text-black border-none"
                align="start"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link>Profile</Link>
                    <DropdownMenuShortcut>
                      <User />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    My Orders
                    <DropdownMenuShortcut>
                      <Package />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    My Reviews
                    <DropdownMenuShortcut>
                      <Star />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button onClick={logoutHandler}>Log Out</button>
                    <DropdownMenuShortcut>
                      <LogOut />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <button onClick={openLogin}>LOGIN</button>
              <button onClick={openSignup}>SIGN UP</button>
            </>
          )}
          <Link>زبان تبدیل کریں</Link>
          <Link>
            <ShoppingCartIcon size={26} className="text-white cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="flex flex-wrap items-center gap-3 mt-3 md:px-28">
        <img
          src={logo}
          onClick={() => {
            navigate("/");
          }}
          alt="logo"
          className="w-28 sm:w-32 md:w-40 cursor-pointer"
        />

        <div className="flex flex-1 min-w-50">
          <Input
          value={searchQuery}
          onChange={(e)=>{setSearchQuery(e.target.value)}}
            placeholder="Search in Daraz"
            className="bg-white text-black border-none rounded-none"
          />
          <Button onClick={(e)=>{handleSearch(e)}} className="bg-[#ffe1d2] text-red-700 rounded-none px-4 cursor-pointer">
            <Search />
          </Button>
        </div>
        <div onClick={()=>{navigate("/addToCart")}} className="relative cursor-pointer hidden md:block">
          <ShoppingCartIcon
            size={26}
            className="text-white   "
          />
          <span className="absolute text-white bg-black text-[12px]  rounded-full px-[6px] py-[0.02px] -top-2 -right-2 ">
            {numberOfCarts}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
