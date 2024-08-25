import { ChakraProvider } from "@chakra-ui/react"
import './App.css';
import Todo from './components/Todo';
import LoginUser from "./components/Login";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Signup from "./components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginUser />
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
