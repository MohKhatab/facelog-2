import React from "react";

export default function PostSkeleton() {
  return (
    <div className="glass flex flex-col animate-pulse">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <div className="bg-background-900 rounded-full size-12"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-32 bg-background-800 rounded"></div>
            <div className="h-3 w-20 bg-background-800 rounded"></div>
          </div>
        </div>

        <div className="h-6 w-48 bg-background-800 rounded"></div>

        <div className="h-4 w-4/5 bg-background-800 rounded"></div>

        <div className="flex flex-col gap-2 mt-2"></div>
      </div>

      <div className="w-full h-64 bg-background-900"></div>

      <div className="flex justify-between gap-4 p-6">
        <div className="h-10 w-20 bg-background-800 rounded"></div>
      </div>
    </div>
  );
}
