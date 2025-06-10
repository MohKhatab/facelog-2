// import React, { useState } from "react";
import {
  MdPerson,
  MdThumbDown,
  MdRemove,
  MdEdit,
  MdArrowRight,
  MdChatBubble,
  MdShare,
} from "react-icons/md";
import PostSwiper from "./PostSwiper";
import Button from "../common/Button";
import InteractionButton from "./InteractionButton";
import Dropdown from "../common/Dropdown";
import { Link, useNavigate } from "react-router";
import RichText from "../common/RichText";
import { useDispatch } from "react-redux";
import {
  addInteraction,
  deletePost,
  removeInteraction,
} from "../../redux/features/posts/postsSlice";
import { useState } from "react";
const token = localStorage.getItem("token");

export default function Post({
  title,
  createdAt,
  images,
  poster,
  _id,
  isDisliked,
  interactionCount,
}) {
  // const [readMore, setReadMore] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function editPost() {
    navigate(`/post/${_id}`);
  }
  const [dislikeCheck, setDislikeCheck] = useState(isDisliked);
  const [currInteractionCount, setcurrInteractionCount] =
    useState(interactionCount);

  function handleInteractionChange(e) {
    setDislikeCheck(e.target.checked);
    if (e.target.checked) {
      dispatch(addInteraction({ token, postId: _id }));
      setcurrInteractionCount(currInteractionCount + 1);
    } else {
      dispatch(removeInteraction({ token, postId: _id }));
      setcurrInteractionCount(currInteractionCount - 1);
    }
  }

  function deletePostHandle() {
    dispatch(deletePost(_id));
  }

  const actions = [
    {
      title: "Edit",
      handler: editPost,
      icon: <MdEdit />,
    },
    {
      title: "Delete",
      handler: deletePostHandle,
      icon: <MdRemove />,
    },
  ];

  const currUser = localStorage["userId"];
  return (
    <div className="flex flex-col bg-background-950/20 backdrop-blur-lg rounded-xl border border-background-800/10 shadow-background-800/20 shadow-lg">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="bg-background-900 rounded-full size-12 flex items-center justify-center p-2">
            <MdPerson className="text-3xl text-background-300"></MdPerson>
          </div>
          <div>
            <p className="font-semibold">{`${poster && poster.firstName} ${
              poster && poster.lastName
            }`}</p>
            <p className="text-text-400 text-sm">
              {new Date(createdAt).toLocaleString("en-GB", { hour12: true })}
            </p>
          </div>
          {currUser == poster._id && (
            <div className="ml-auto">
              <Dropdown actions={actions}></Dropdown>
            </div>
          )}
        </div>
        <p className="font-semibold text-2xl">{title}</p>

        {/* <div className={` transition-all overflow-hidden duration-150`}>
          {content && <RichText textJson={content}></RichText>}
        </div> */}
      </div>
      <PostSwiper images={images}></PostSwiper>
      <div className="flex justify-between gap-4 p-6">
        <InteractionButton
          checked={dislikeCheck}
          handler={handleInteractionChange}
          interactionCount={currInteractionCount}
          icon={<MdThumbDown></MdThumbDown>}
        ></InteractionButton>
        <Link
          to={`/details/${_id}`}
          className="flex items-center justify-center text-accent-500 text-base text-center px-4 bg-accent-500/5 hover:bg-accent-500/10
         cursor-pointer transition-all rounded-lg text-shadow-md hover:text-shadow-accent-500/30 border border-accent-500/20 hover:border-accent-500/40"
        >
          <span>
            <MdChatBubble className="text-2xl"></MdChatBubble>
          </span>
          <span className="text-lg ml-3">2</span>
        </Link>
        <Link
          to={`/details/${_id}`}
          className="flex items-center justify-center text-accent-500 text-base text-center px-4 bg-accent-500/5 hover:bg-accent-500/10
         cursor-pointer transition-all rounded-lg text-shadow-md hover:text-shadow-accent-500/30 border border-accent-500/20 hover:border-accent-500/40"
        >
          <span>
            <MdShare className="text-2xl"></MdShare>
          </span>
          <span className="text-lg ml-3">2</span>
        </Link>
        <Link
          to={`/details/${_id}`}
          className="flex items-center justify-center text-accent-500 text-base text-center w-full bg-accent-500/5 hover:bg-accent-500/10
         cursor-pointer transition-all rounded-lg text-shadow-md hover:text-shadow-accent-500/30 border border-accent-500/20 hover:border-accent-500/40"
        >
          <span>Read Post</span>{" "}
          <MdArrowRight className="ml-1 text-2xl"></MdArrowRight>
        </Link>
      </div>
    </div>
  );
}
