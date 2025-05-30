import React, { useEffect, useState } from "react";
import TipTap from "../components/postForm/TipTap";
import { MdAdd, MdAttachFile, MdClose, MdSave } from "react-icons/md";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { Form, Formik } from "formik";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  fetchSinglePost,
  updatePost,
} from "../redux/features/posts/postsSlice";
import { useNavigate, useParams } from "react-router";
import PostFormSkeleton from "../components/postForm/PostFormSkeleton";
import { object, string } from "yup";

export default function AddPost() {
  const [files, setFiles] = useState([]);
  const [fileObjects, setFileObjects] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [postContent, setPostContent] = useState();
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const params = useParams();

  // Determine mode
  const editMode = params.id !== "new" ? true : false;

  // Fetch post to update
  const postsStore = useSelector((state) => state.posts);
  useEffect(() => {
    if (editMode) dispatch(fetchSinglePost(params.id));
  }, [dispatch, params, editMode]);

  useEffect(() => {
    if (postsStore.singlePost && editMode) {
      setExistingImages([...postsStore.singlePost.images]);
      setPostContent(postsStore.singlePost.content);
    }
  }, [postsStore.singlePost, editMode]);

  useEffect(() => {
    if (postsStore.postSaved) naviagte("/");
  }, [postsStore.postSaved, naviagte]);

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }

  function handleFileInput(e) {
    const addedFiles = Array.from(e.target.files);
    addFiles(addedFiles);
  }

  function removeExistingImage(url) {
    const existingImagesCopy = existingImages;
    setImagesToRemove([...imagesToRemove, url]);
    setExistingImages(existingImagesCopy.filter((img) => img !== url));
  }

  let addedCount = 0;
  function addFiles(filesToAdd) {
    addedCount = files.length + existingImages.length;
    filesToAdd.forEach((file) => {
      if (file.type.startsWith("image/") && addedCount < 5) {
        addedCount++;
        setFileObjects((prevFiles) => [...prevFiles, file]);

        const reader = new FileReader();
        reader.onload = (event) => {
          setFiles((prevFiles) => [...prevFiles, event.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function removeFileByIndex(fileIndex) {
    const filesCopy = [...files];
    filesCopy.splice(fileIndex, 1);
    setFiles(filesCopy);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handlePostSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    if (postContent) formData.append("content", JSON.stringify(postContent));
    fileObjects.forEach((f) => {
      formData.append("files", f);
    });
    const token = localStorage.getItem("token");
    const postId = params.id;
    if (!editMode) {
      dispatch(createPost({ formData, token }));
    } else {
      imagesToRemove.forEach((i) => formData.append("imagesToRemove", i));
      dispatch(updatePost({ formData, token, postId }));
    }
  }

  if (editMode && (postsStore.loading || !postsStore.singlePost))
    return <PostFormSkeleton></PostFormSkeleton>;
  return (
    <div className="px-5 md:px-12 lg:px-22 xl:px-46 mt-8">
      <h1 className="pl-6 text-3xl md:text-4xl font-semibold mb-8">
        {editMode ? "Edit your post" : "Create new post"}
      </h1>
      <Formik
        validationSchema={object({
          title: string("Title must be a string").required("Title is required"),
        })}
        initialValues={{
          title: editMode ? postsStore.singlePost.title : "",
        }}
        onSubmit={handlePostSubmit}
      >
        <Form className="flex flex-col gap-6">
          <div className="glass p-6">
            <label className="text-xl md:text-2xl font-semibold block mb-3">
              Title
            </label>
            <TextInput
              disabled={postsStore.loading}
              placeholder="Enter title of the post"
              name="title"
              key="title"
            ></TextInput>
          </div>
          <div>
            <TipTap
              content={editMode ? postsStore.singlePost.content : ""}
              setPostContent={setPostContent}
            ></TipTap>
          </div>
          <div
            className="glass p-6 relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={(e) => {
              if (e.currentTarget === e.target) setDragActive(false);
            }}
          >
            <label className="mb-5 block text-xl md:text-2xl font-semibold">
              {`Images (${files.length + existingImages.length}/5)`}
            </label>

            <div
              className="flex gap-4 overflow-x-scroll py-4
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-grayscale-100/10
              [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-accent-500/50"
            >
              {existingImages.map((f, i) => (
                <div
                  className="size-40 p-4 relative bg-primary-50/5 shrink-0 rounded"
                  key={"loadedImage" + i}
                >
                  <button
                    type="button"
                    onClick={() => removeExistingImage(f)}
                    className="absolute top-2 right-2 size-11 flex items-center justify-center rounded bg-accent-700/40 text-accent-50/70 hover:text-accent-50 cursor-pointer  backdrop-blur-lg"
                  >
                    <MdClose className="text-2xl" />
                  </button>
                  <img
                    draggable="false"
                    src={f}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              ))}

              {files.map((f, i) => (
                <div
                  className="size-40 p-4 relative bg-primary-50/5 shrink-0 rounded"
                  key={"loadedImage" + i}
                >
                  <button
                    type="button"
                    onClick={() => removeFileByIndex(i)}
                    className="absolute top-2 right-2 size-11 flex items-center justify-center rounded bg-accent-700/40 text-accent-50/70 hover:text-accent-50 cursor-pointer  backdrop-blur-lg"
                  >
                    <MdClose className="text-2xl" />
                  </button>
                  <img
                    draggable="false"
                    src={f}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              ))}

              {files.length + existingImages.length < 5 && (
                <div className="size-40 relative border-2 border-accent-100/50 rounded-lg flex flex-col items-center justify-center text-accent-100/50 hover:text-accent-100/90 hover:border-accent-100/90 transition-colors shrink-0">
                  <input
                    multiple
                    onInput={handleFileInput}
                    type="file"
                    className="absolute w-full h-full opacity-0 rounded cursor-pointer"
                  />
                  <MdAdd className="text-xl md:text-2xl"></MdAdd>
                  <p>Add Image</p>
                </div>
              )}
              {files.length + existingImages.length < 4 &&
                [...Array(4 - files.length - existingImages.length).keys()].map(
                  (i) => (
                    <div
                      key={"emptyImage" + i}
                      className="size-40 relative border-2 border-accent-100/10 rounded-lg shrink-0"
                    ></div>
                  )
                )}
            </div>

            {dragActive && (
              <div className="absolute top-0 left-0 w-full h-full backdrop-blur-2xl bg-background-950/30 flex items-center justify-center flex-col gap-5 z-50">
                <MdAttachFile className="text-5xl"></MdAttachFile>
                <p className="text-2xl">Drop files to upload</p>
              </div>
            )}
          </div>

          <div className="w-40 ml-auto mb-8">
            <Button
              isDisabled={
                !postContent || files.length + existingImages.length === 0
              }
              loading={postsStore.loading}
              type="submit"
              buttonText="Save Post"
              leftIcon={<MdSave className="mr-2 text-xl"></MdSave>}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
