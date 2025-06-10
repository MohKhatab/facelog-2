import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchSinglePost } from "../redux/features/posts/postsSlice";
import { useEffect, useRef, useState } from "react";
import {
  addComment,
  fetchComments,
} from "../redux/features/comments/commentsSlice";
import Comment from "../components/postDetails/Comment";
import Button from "../components/common/Button";
import { MdMessage, MdSend } from "react-icons/md";
import Swiper from "swiper";
import PostSwiper from "../components/post/PostSwiper";
import RichText from "../components/common/RichText";

export default function PostDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const postsStore = useSelector((state) => state.posts);
  const commentsStore = useSelector((state) => state.comments);
  const commentsContainerRef = useRef(null);

  const [commentContent, setCommentContent] = useState("");

  function handleAddComment() {
    if (commentContent) {
      dispatch(addComment({ postId: params.id, content: commentContent }));
      setCommentContent("");

      requestAnimationFrame(() => {
        if (commentsContainerRef.current) {
          commentsContainerRef.current.scrollTo({
            top: commentsContainerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      });
    }
  }

  useEffect(() => {
    dispatch(fetchSinglePost(params.id));
    dispatch(fetchComments(params.id));
  }, [dispatch, params]);

  if (postsStore.loading && !postsStore.singlePost) return <p>Loading</p>;

  if (!postsStore.singlePost) return <p>Loading</p>;

  return (
    <div className="grid grid-cols-12 gap-5 lg:gap-10 my-8 px-5 lg:px-10 xl:px-32">
      <div className="glass col-span-12 lg:col-span-8 p-6">
        <div className="rounded-lg">
          <PostSwiper images={postsStore.singlePost.images}></PostSwiper>
        </div>
        <h1 className="text-5xl my-8 font-bold mt-8">
          {postsStore.singlePost.title}
        </h1>
        {postsStore.singlePost.description && (
          <p>{postsStore.singlePost.description}</p>
        )}
        {postsStore.singlePost.content && (
          <RichText textJson={postsStore.singlePost.content}></RichText>
        )}
      </div>
      <div
        ref={commentsContainerRef}
        className="glass col-span-12 lg:col-span-4 p-6 flex flex-col gap-6 lg:sticky top-26 lg:h-[80dvh] lg:overflow-y-scroll
        [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-grayscale-100/10
          [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-accent-500/50"
      >
        <div className=" flex flex-col gap-4 bg-background-950/90 w-full left-0 top-0 rounded-lg sticky shrink-0 border-accent-500/20 focus:border-accent-500/50 border backdrop-blur-2xl p-4">
          <textarea
            value={commentContent}
            onInput={(e) => {
              setCommentContent(e.target.value);
            }}
            placeholder="Write a comment..."
            className=" outline-0 resize-none 
            [&::-webkit-scrollbar]:w-2 
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-grayscale-100/10
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-accent-500/50"
            rows="3"
          ></textarea>
          <div className="w-12 ml-auto">
            <Button
              isDisabled={!commentContent || commentsStore.loading}
              clickHandler={handleAddComment}
              height="h-11"
              leftIcon={<MdSend className="text-xl" />}
            />
          </div>
        </div>
        {commentsStore.loading && !commentsStore.comments ? (
          <p>Loading</p>
        ) : commentsStore.comments.length ? (
          commentsStore.comments.map((comment) => <Comment comment={comment} />)
        ) : (
          <div>
            <p className="text-2xl text-center mt-4 font-semibold">
              No Comments To Show
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
