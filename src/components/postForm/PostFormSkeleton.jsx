import React from "react";

export default function PostFormSkeleton() {
  return (
    <div className="px-5 md:px-12 lg:px-22 xl:px-46 mt-8 animate-pulse">
      <h1 className="pl-6 text-3xl md:text-4xl font-semibold mb-8">
        Edit your post
      </h1>

      <div className="flex flex-col gap-6">
        <div className="glass p-6">
          <div className="h-6 w-24 bg-background-800 rounded mb-4"></div>
          <div className="h-12 w-full bg-background-900 rounded"></div>
        </div>

        <div className="glass p-6 h-64 bg-background-900 rounded"></div>

        <div className="glass p-6 relative">
          <div className="h-6 w-40 bg-background-800 rounded mb-4"></div>

          <div className="flex gap-4 overflow-x-scroll py-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={"skeletonImage" + i}
                className="size-40 bg-background-900 rounded shrink-0"
              ></div>
            ))}
            <div className="size-40 border-2 border-accent-100/30 rounded-lg flex flex-col items-center justify-center text-accent-100/50 shrink-0">
              <div className="h-6 w-6 bg-background-800 rounded mb-2"></div>
              <div className="h-3 w-16 bg-background-800 rounded"></div>
            </div>
          </div>
        </div>

        <div className="w-40 ml-auto mb-8">
          <div className="h-10 bg-background-800 rounded"></div>
        </div>
      </div>
    </div>
  );
}
