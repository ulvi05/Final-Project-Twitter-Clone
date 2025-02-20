import { CiImageOn } from "react-icons/ci";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { useAppSelector } from "@/hooks";
import { selectUserData } from "@/store/features/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "@/services/posts";
import { QUERY_KEYS } from "@/constants/query-keys";

interface CreatePostProps {
  text: string;
  img: string;
  video: string;
}

type FileInputEvent = React.ChangeEvent<HTMLInputElement>;

const CreatePost: React.FC<CreatePostProps> = () => {
  const [text, setText] = useState<string>("");
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const { user } = useAppSelector(selectUserData);
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: { text: string; media?: File | null }) =>
      postService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POSTS],
      });
      setText("");
      setMedia(null);
      setMediaType(null);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = imgRef.current?.files?.[0] || null;

    createPost({
      text,
      media: file,
    });
  };

  const handleMediaChange = (e: FileInputEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith("image") ? "image" : "video";
      setMediaType(fileType);

      const reader = new FileReader();
      reader.onload = () => {
        setMedia(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 border-b border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={user?.profileImage || "/avatar-placeholder.png"} />
        </div>
      </div>
      <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
        <textarea
          className="w-full p-0 text-lg border-gray-800 border-none resize-none textarea focus:outline-none"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {media && (
          <div className="relative mx-auto w-72">
            <IoCloseSharp
              className="absolute top-0 right-0 w-5 h-5 p-0.5 text-white bg-gray-800 rounded-full cursor-pointer"
              onClick={() => {
                setMedia(null);
                setMediaType(null);
                if (imgRef.current) {
                  imgRef.current.value = "";
                }
              }}
            />
            {mediaType === "image" ? (
              <img
                src={media}
                className="object-contain w-full mx-auto rounded h-72"
              />
            ) : (
              <video
                src={media}
                className="object-contain w-full mx-auto rounded h-72"
                controls
              />
            )}
          </div>
        )}

        <div className="flex justify-between py-2 border-t border-t-gray-700">
          <div className="flex items-center gap-1">
            <CiImageOn
              className="w-6 h-6 cursor-pointer fill-primary"
              onClick={() => imgRef.current?.click()}
            />
            <FaRegSmile className="w-5 h-5 cursor-pointer fill-primary" />
          </div>
          <input
            type="file"
            accept="image/*, video/*"
            hidden
            ref={imgRef}
            onChange={handleMediaChange}
          />
          <button className="px-4 text-white rounded-full btn btn-primary btn-sm">
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">Something went wrong</div>}
      </form>
    </div>
  );
};

export default CreatePost;
