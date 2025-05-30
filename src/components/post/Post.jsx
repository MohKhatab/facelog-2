// import React, { useState } from "react";
import { MdPerson, MdThumbDown, MdRemove, MdEdit } from "react-icons/md";
import PostSwiper from "./PostSwiper";
import Button from "../common/Button";
import InteractionButton from "./InteractionButton";
import Dropdown from "../common/Dropdown";
import { useNavigate } from "react-router";
import RichText from "../common/RichText";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/features/posts/postsSlice";

export default function Post({
  title,
  description,
  createdAt,
  images,
  poster,
  content,
  _id,
}) {
  // const [readMore, setReadMore] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function editPost() {
    navigate(`/post/${_id}`);
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
    <div className="glass flex flex-col">
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
        {description && <p>{description}</p>}
        {/* ${
            readMore ? "max-h-[100%]" : "max-h-24"
          } */}
        <div className={` transition-all overflow-hidden duration-150`}>
          {content && <RichText textJson={content}></RichText>}
        </div>
        {/* TODO: Read more */}
        {/* <button
          className="bg-background-50/5 hover:bg-background-50/10 cursor-pointer transition-colors rounded py-3 "
          onClick={() => setReadMore((prevState) => !prevState)}
        >
          {readMore ? "Read less" : "Read more"}
        </button> */}
      </div>
      <PostSwiper images={images}></PostSwiper>
      <div className="flex justify-between gap-4 p-6">
        <InteractionButton
          icon={<MdThumbDown></MdThumbDown>}
        ></InteractionButton>
      </div>
    </div>
  );
}
