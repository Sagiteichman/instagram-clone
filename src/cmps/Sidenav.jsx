import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Icons
import HomeIcon from "../assets/svg/HomeFocus.jsx";
import SearchIcon from "../assets/svg/Search.jsx";
import ExploreIcon from "../assets/svg/Explore.jsx";
import ReelsIcon from "../assets/svg/Reels.jsx";
import ChatIcon from "../assets/svg/Messenger.jsx";
import LikeIcon from "../assets/svg/Like.jsx";
import CreateIcon from "../assets/svg/Create.jsx";
import MoreIcon from "../assets/svg/Hamburger.jsx";
import { Avatar } from "@mui/material";

function Sidenav({ toggleModal, user }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log("pathname", pathname);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="sidenav">
      {/* <img
        className='sidenav__logo'
        src='https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distraction.png'
        alt='insagram logo'
      /> */}
      <h1 className="sidenav__logo">Bellingram</h1>
      <div className="sidenav__buttons">
        <button
          className={"sidenav__button" + (pathname === "/" ? " selected" : "")}
          onClick={() => handleNavigate("/")}
        >
          <HomeIcon fill="white" />
          <span>Home</span>
        </button>

        <button
          className={
            "sidenav__button" + (pathname === "/search" ? " selected" : "")
          }
        >
          <SearchIcon />
          <span>Search</span>
        </button>

        <button
          className={
            "sidenav__button" + (pathname === "/explore" ? " selected" : "")
          }
        >
          <ExploreIcon />
          <span>Explore</span>
        </button>

        <button
          className={
            "sidenav__button" + (pathname === "/reels" ? " selected" : "")
          }
        >
          <ReelsIcon />
          <span>Reels</span>
        </button>

        <button
          className={
            "sidenav__button" + (pathname === "/messages" ? " selected" : "")
          }
        >
          <ChatIcon />
          <span>Messages</span>
        </button>

        <button
          className={
            "sidenav__button" +
            (pathname === "/notifications" ? " selected" : "")
          }
        >
          <LikeIcon />
          <span>Notifications</span>
        </button>

        <button
          className={
            "sidenav__button" + (pathname === "/create" ? " selected" : "")
          }
          onClick={toggleModal}
        >
          <CreateIcon />
          <span>Create</span>
        </button>

        <button
          className={
            "sidenav__button avatar__button" +
            (pathname === "/profile" ? " selected" : "")
          }
          onClick={() => handleNavigate("/profile")}
        >
          {user && (
            <Avatar
              className="sidenav__avatar"
              src={user.imageUrl}
              alt={user.name || "Guest"}
            >
              {/* {!postImage && user.charAt(0).toUpperCase()} */}
            </Avatar>
          )}
          <span>Profile</span>
        </button>
      </div>

      <div className="sidenav_spacer"></div>
      <div className="sidenav__more">
        <button
          className={"sidenav__button" + (pathname === "/" ? " selected" : "")}
        >
          <MoreIcon />
          <span>More</span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
