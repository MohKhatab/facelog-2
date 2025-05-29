import React from "react";
import {
  MdPerson,
  MdThumbDown,
  MdShare,
  MdThumbUp,
  MdUnfoldMore,
} from "react-icons/md";
import PostSwiper from "./PostSwiper";
import Button from "../common/Button";
import InteractionButton from "./InteractionButton";

export default function Post({
  title,
  description,
  createdAt,
  images,
  poster,
  _id,
}) {
  console.log("poster", poster);
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
        </div>
        <p className="font-semibold text-2xl">{title}</p>
        <p>{description}</p>
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
