import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "@/types/index";

import Posts from "@/components/common/Posts";
import ProfileHeaderSkeleton from "@/components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "@/utils/db/dummy-data";

import { FaArrowLeft, FaLink } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

type CoverImageProps = {
  coverImg: string | null;
  defaultImg: string;
  onEditClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMyProfile: boolean;
};

type ProfileImageProps = {
  profileImg: string | null;
  defaultImg: string;
  onEditClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMyProfile: boolean;
};

const Header = ({
  fullName,
  postCount,
}: {
  fullName: string;
  postCount: number;
}) => (
  <div className="flex items-center gap-10 px-4 py-2">
    <Link to="/">
      <FaArrowLeft className="w-4 h-4" />
    </Link>
    <div className="flex flex-col">
      <p className="text-lg font-bold">{fullName}</p>
      <span className="text-sm text-slate-500">{postCount} posts</span>
    </div>
  </div>
);

const CoverImage = ({
  coverImg,
  defaultImg,
  onEditClick,
  inputRef,
  onChange,
  isMyProfile,
}: CoverImageProps) => (
  <div className="relative group">
    <img
      src={coverImg || defaultImg}
      className="object-cover w-full h-52"
      alt="cover"
    />
    {isMyProfile && (
      <div
        className="absolute p-2 bg-gray-800 bg-opacity-75 rounded-full opacity-0 cursor-pointer top-2 right-2 group-hover:opacity-100"
        onClick={onEditClick}
      >
        <MdEdit className="w-5 h-5 text-white" />
      </div>
    )}
    <input type="file" hidden ref={inputRef} onChange={onChange} />
  </div>
);

const ProfileImage = ({
  profileImg,
  defaultImg,
  onEditClick,
  inputRef,
  onChange,
  isMyProfile,
}: ProfileImageProps) => (
  <div className="absolute bottom-[-5rem] left-4">
    <div className="relative w-32 h-32 overflow-hidden rounded-full group">
      <img
        src={profileImg || defaultImg}
        alt="profile"
        className="object-cover w-full h-full"
      />
      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={onChange}
      />
      {isMyProfile && (
        <div
          className="absolute p-1.5 bg-gray-800 bg-opacity-75 rounded-full opacity-0 cursor-pointer top-2 right-3 group-hover:opacity-100"
          onClick={onEditClick}
        >
          <MdEdit className="z-40 w-4 h-4 text-white" />
        </div>
      )}
    </div>
  </div>
);

const BioSection = ({ user }: { user: User }) => (
  <div className="flex flex-col gap-4 px-4 mt-14">
    <div className="flex flex-col">
      <span className="text-lg font-bold">{user?.fullName}</span>
      <span className="text-sm text-slate-500">@{user?.username}</span>
      <span className="my-1 text-sm">{user?.bio}</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {user?.link && (
        <div className="flex items-center gap-1">
          <FaLink className="w-3 h-3 text-slate-500" />
          <a
            href={user.link}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            {user.link}
          </a>
        </div>
      )}
      <div className="flex items-center gap-2">
        <IoCalendarOutline className="w-4 h-4 text-slate-500" />
        <span className="text-sm text-slate-500">Joined Febuary 2024</span>
      </div>
    </div>
    <div className="flex gap-2">
      <div className="flex items-center gap-1">
        <span className="text-xs font-bold">{user?.following.length}</span>
        <span className="text-xs text-slate-500">Following</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs font-bold">{user?.followers.length}</span>
        <span className="text-xs text-slate-500">Followers</span>
      </div>
    </div>
  </div>
);

const FeedTabs = ({
  feedType,
  setFeedType,
}: {
  feedType: string;
  setFeedType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const tabs = [
    { key: "posts", label: "Posts" },
    { key: "likes", label: "Likes" },
  ];

  return (
    <div className="flex w-full mt-4 border-b border-gray-700">
      {tabs.map(({ key, label }) => (
        <div
          key={key}
          className={`relative flex justify-center flex-1 p-3 cursor-pointer ${
            feedType === key ? "text-primary" : "text-slate-500"
          } hover:bg-secondary`}
          onClick={() => setFeedType(key)}
        >
          {label}
          {feedType === key && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
          )}
        </div>
      ))}
    </div>
  );
};

const ProfilePage = () => {
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [feedType, setFeedType] = useState("posts");

  const coverImgRef = useRef<HTMLInputElement | null>(null);
  const profileImgRef = useRef<HTMLInputElement | null>(null);

  const isLoading = false;
  const isMyProfile = true;

  const user = {
    _id: "1",
    fullName: "Ulvi Aghazade",
    username: "u1lviii",
    profileImg: "/avatars/samurai.png",
    coverImg: "/cover.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "https://x.com/u1lviii",
    following: ["1", "2", "3"],
    followers: ["1", "2", "3"],
  };

  const handleImgChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: "coverImg" | "profileImg"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (state === "coverImg") setCoverImg(reader.result as string | null);
        if (state === "profileImg")
          setProfileImg(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
      {isLoading && <ProfileHeaderSkeleton />}
      {!isLoading && !user && (
        <p className="mt-4 text-lg text-center">User not found</p>
      )}
      {!isLoading && user && (
        <>
          <Header fullName={user.fullName} postCount={POSTS.length} />

          <div className="relative">
            <CoverImage
              coverImg={coverImg || user.coverImg}
              defaultImg="/default-cover.png"
              onEditClick={() => coverImgRef.current?.click()}
              inputRef={coverImgRef}
              onChange={(e) => handleImgChange(e, "coverImg")}
              isMyProfile={isMyProfile}
            />
            <ProfileImage
              profileImg={profileImg || user.profileImg}
              defaultImg="/default-avatar.png"
              onEditClick={() => profileImgRef.current?.click()}
              inputRef={profileImgRef}
              onChange={(e) => handleImgChange(e, "profileImg")}
              isMyProfile={isMyProfile}
            />
          </div>
          <div className="flex justify-end px-4 mt-5">
            {isMyProfile ? (
              <EditProfileModal />
            ) : (
              <button
                className="rounded-full btn btn-outline btn-sm"
                onClick={() => alert("Followed successfully")}
              >
                Follow
              </button>
            )}
            {(coverImg || profileImg) && (
              <button
                className="px-4 ml-2 rounded-full btn btn-primary btn-sm"
                onClick={() => alert("Profile updated successfully")}
              >
                Update
              </button>
            )}
          </div>
          <BioSection user={user} />
          <FeedTabs feedType={feedType} setFeedType={setFeedType} />
          <Posts />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
