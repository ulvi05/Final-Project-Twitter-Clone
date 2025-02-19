import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCurrentUserAsync,
  selectUserData,
} from "@/store/features/userSlice";
import { AppDispatch } from "@/store";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const AuthGuard = () => {
  const { loading } = useSelector(selectUserData);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return <Outlet />;
};

export default AuthGuard;
