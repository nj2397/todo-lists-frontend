import { ChakraProvider } from "@chakra-ui/react"
import './App.css';
import Todo from './components/Todo';
import LoginUser from "./components/Login";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Signup from "./components/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}><LoginUser /></GoogleOAuthProvider>
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/todo-dashboard",
    element: <Todo />
  }
])

function App() {
  return (
    <div className="App">

        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>

    </div>
  );
}

export default App;
