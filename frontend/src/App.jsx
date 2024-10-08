import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { Profile } from "./pages/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import { UpdateUser } from "./pages/UpdateUser/UpdateUser";
import { AllUsersPage } from "./pages/AllUsers/AllUsersPage";
import { PostPicture } from "./pages/CreatePost/PostPicture";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts",
    element: <FeedPage />,
  },
  {
    path: "/createpost",
    element: <PostPicture />, // route to a page simply containing CreatePostForm
  },
  {
    path: "/users/me",
    element: <Profile />, // route to page for current users profile
  },
  {
    path: "/users/me/update",
    element: <UpdateUser />, //
  },
  {
    path: "/viewAllUsers",
    element: <AllUsersPage />, //
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
