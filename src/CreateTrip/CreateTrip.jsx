import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/Constants/Options";
import { chatSession } from "@/Service/AiModel";
// import { ChatSession } from "@google/generative-ai";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const saveTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AItrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/allTrip/"+docId)
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (formData?.NoOfDays > 5 || formData?.NoOfDays < 1 && !formData?.location ||!formData?.budget ||!formData?.people) {
      // console.log("Please enter the valid Number")
      toast("Please Fill All The Details.");

      return;
    }
    // console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location",
      formData?.location?.label
    )
      .replace("{NoOfDays}", formData?.NoOfDays)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget);
    // console.log(FINAL_PROMPT);
    try {
      const res = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(res?.response?.text());
      setLoading(false);
      saveTrip(res?.response?.text());
    } catch (error) {
      console.error("Error sending message:", error);
      toast("Error generating trip. Please try again.");
    }
  };

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
        OnGenerateTrip();
      });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your preferences 🌊🌴⛅</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information,and our trip planner will generate a
        customized results based on your preferences
      </p>

      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEYS}
            selectProps={{
              place,
              onChange: (e) => {
                setPlace(e);
                handleInput("location", e);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning trip?
          </h2>
          <Input
            placeholder={"Ex-3"}
            type="Number"
            onChange={(e) => handleInput("NoOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget</h2>
          <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
            {SelectBudgetOptions.map((item, index) => (
              <div
                onClick={() => handleInput("budget", item.title)}
                key={index}
                className={`p-4 border rounded-lg hover:shadow-2xl ${
                  formData?.budget == item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many person want to travel ?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 cursor-pointer">
            {SelectTravelsList.map((item, index) => (
              <div
                onClick={() => handleInput("people", item.people)}
                key={index}
                className={`p-4 border rounded-lg hover:shadow-2xl ${
                  formData?.people == item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10  justify-end flex">
        <Button onClick={OnGenerateTrip}  disabled={loading} variant="outline" className="rounded-2xl">
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/> : "Generate Trip"}
        </Button>
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

export default CreateTrip;
