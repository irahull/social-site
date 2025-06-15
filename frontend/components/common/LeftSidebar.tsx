"use client";
import {
  Heart,
  HomeIcon,
  LogOutIcon,
  MessageCircle,
  SearchIcon,
  SquarePlus,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";

const LeftSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const sidebarItems = [
    {
      id: 1,
      icon: <HomeIcon />,
      label: "Home",
    },
    {
      id: 2,
      icon: <SearchIcon />,
      label: "Search",
    },
    {
      id: 3,
      icon: <MessageCircle />,
      label: "Message",
    },
    {
      id: 4,
      icon: <Heart />,
      label: "Notification",
    },
    {
      id: 5,
      icon: <SquarePlus />,
      label: "Create",
    },
    {
      id: 6,
      icon: (
        <Avatar>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      label: "Profile",
    },
    {
      id: 7,
      icon: <LogOutIcon />,
      label: "Logout",
    },
  ];
  return (
    <div className="h-full w-full">
      <div className="p-3 lg:p-5 cursor-pointer">
        <Image
          src="https://github.com/shadcn.png"
          alt="logo"
          width={80}
          height={80}
          className="rounded-lg mx-auto "
        />
      
      <div className="w-full flex flex-col gap-[10px] mt-5">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className="w-full group flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200 "
          >
            <div className="group-hover:scale-110 transition-all duration-200">
              {item.icon}
            </div>
            <p className="text-base lg:text-lg">{item.label}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
