import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/features/posts/postsSlice";
import Post from "../components/post/Post";
import { useEffect } from "react";
import Button from "../components/common/Button";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router";
import PostSkeleton from "../components/post/PostSkeleton";

export default function Home() {
  const dispatch = useDispatch();
  const postsStore = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (postsStore.loading && !postsStore.posts)
    return (
      <div className="grid grid-cols-12 gap-5 lg:gap-10 my-8 px-5 lg:px-10 xl:px-32 relative">
        <div className="hidden lg:block col-span-3">
          <div className="glass p-6 text-center font-semibold text-lg">
            Work In Progress
          </div>
        </div>

        <div className="col-span-full lg:col-span-9 xl:col-span-6 flex gap-8 flex-col ">
          <PostSkeleton></PostSkeleton>
          <PostSkeleton></PostSkeleton>
          <PostSkeleton></PostSkeleton>
        </div>

        <div className="hidden xl:block w-full col-span-3">
          <div className="glass p-6 text-center font-semibold text-lg">
            Work In Progress
          </div>
        </div>
      </div>
    );

  if (postsStore.posts)
    return (
      <>
        <div className="grid grid-cols-12 gap-5 lg:gap-10 my-8 px-5 lg:px-10 xl:px-32 relative">
          <div className="hidden lg:block col-span-3">
            <div className="glass p-6 text-center font-semibold text-lg">
              Work In Progress
            </div>
          </div>
          <div className="col-span-full lg:col-span-9 xl:col-span-6 flex gap-8 flex-col ">
            {postsStore.posts.map((post) => (
              <Post key={post._id} {...post} />
            ))}
          </div>
          <div className="hidden xl:block w-full col-span-3">
            <div className="glass p-6 text-center font-semibold text-lg">
              Work In Progress
            </div>
          </div>
          <Link
            to="post/new"
            className="fixed bottom-5 right-5 lg:bottom-8 lg:right-8 w-16"
          >
            <Button leftIcon={<MdAdd className="text-3xl"></MdAdd>}></Button>
          </Link>
        </div>
      </>
    );
}
