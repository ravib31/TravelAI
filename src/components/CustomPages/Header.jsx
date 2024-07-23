import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // console.log(userInfo);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?aceess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 border border-black ">
      <div>
      <a href="/">
      <img src="./logo.svg" alt="Logo" />
    </a>
      </div>
      <div>
        {userInfo ? (
          <div className="flex items-center gap-2">
            <a href="/createTrip">
              <Button variant="outline" className="rounded-2xl">
              ➕Create Trip
              </Button>
            </a>
            <a href="/myTrip">
              <Button variant="outline" className="rounded-2xl">
                My Trip
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={userInfo.picture} className="rounded-full h-10" />
              </PopoverTrigger>
              <PopoverContent className="w-30">
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                    window.location.href = "/";
                  }}
                >
                  LogOut
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2>Sign In with Google</h2>
              <h2>Sign in to the app with Google authentication</h2>
              <Button
                onClick={login}
                className="w-full mt-4 bg-black text-white hover:bg-black flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
