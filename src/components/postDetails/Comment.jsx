import { MdPerson } from "react-icons/md";

export default function Comment({ comment }) {
  return (
    <div>
      <div className="flex gap-2">
        <div className="bg-background-900 rounded-full size-12 flex items-center justify-center p-2">
          <MdPerson className="text-3xl text-background-300"></MdPerson>
        </div>
        <div>
          <p className="font-semibold">{`${comment.userId.firstName} ${comment.userId.lastName}`}</p>
          <p className="text-text-400 text-sm">
            {new Date(comment.createdAt).toLocaleString("en-GB", {
              hour12: true,
            })}
          </p>
        </div>
      </div>

      <p className="mt-3 px-2">{comment.content}</p>
      <hr className="mt-4 text-background-900/60" />
    </div>
  );
}
