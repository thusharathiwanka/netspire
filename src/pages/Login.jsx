// import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";

import loginVideo from "../assets/videos/login-movie.mp4";
import logo from "../assets/images/netspire-logo-white.png";

const Login = () => {
  const handleGoogleLogin = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;
    const document = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl
    };
    console.log(document);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          src={loginVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="300px" alt="login-logo" />
          </div>
          <div className="shadow-2xl mt-4">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  className="bg-mainColor flex justify-center items-center py-3 px-8 font-medium rounded-md cursor-pointer"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                  <FcGoogle className="mr-4 text-xl" /> Sign in with Google
                </button>
              )}
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
