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
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./components/redux/LoginReducer"
import signupReducer from "./components/redux/SignupReducer"
import ProtectedRoute from "./components/redux/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <LoginUser />
      </GoogleOAuthProvider>
    )
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/todo-dashboard",
    element: (
      <ProtectedRoute>
        <Todo />
      </ProtectedRoute>
    )
  }
])

const store = configureStore({
  reducer: {
    userLoggingIn: loginReducer,
    userSigningUp: signupReducer
  }
})

function App() {
  return (
    <div className="App">

      <Provider store={store}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider>

    </div>
  );
}

export default App;
