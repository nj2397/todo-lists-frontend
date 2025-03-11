import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginCreds = createSlice({
    name: "Login",
    initialState: {
        value: {
            username: "",
            password: ""
        }
    },

    reducers: {
        setCreds: (state, action) => {
            // console.log('Updated state value:', JSON.parse(JSON.stringify(state.value)))
            state.value = {
                ...state.value,
                [action.payload.key]: action.payload.value
            }
        },
        
    }
})


export const { setCreds } = loginCreds.actions;
export default loginCreds.reducer


export const loginUser = (toast, navigate) => async (dispatch, getState) => {
        const { value } = getState().userLoggingIn;
        console.log("value --> ", value)

        try {
            const response = await axios.post(`${process.env.REACT_APP_TODO_SERVER_URI}/login`, value)
            console.log('response --> ', response.data)
            if (response.data.status === 200 && response.data.message.userID) {
                toast({
                    title: "Credentials Verified Successfully",
                    status: 'success',
                    duration: 10000,
                    isClosable: true
                })
                localStorage.setItem( 'userID', response.data.message.userID )
                localStorage.setItem( 'token', response.data.message.token )
                navigate("/todo-dashboard")
                return
            }

            if (response.data.status === 200 && response.data.message === "User Not Found") {
                toast({
                    title: "User Not Found",
                    status: 'info',
                    duration: 10000,
                    isClosable: true
                })
                return;
            }

            if (response.data.status === 200 && response.data.message === "No User") {
                toast({
                    title: "No User Found",
                    status: 'info',
                    duration: 10000,
                    isClosable: true
                })
                return;
            }

            if (response.data.status === 200 && response.data.message === "Incorrect Password") {
                toast({
                    title: "Incorrect Password",
                    status: "error",
                    duration: "2000",
                    isClosable: false
                })

                return;
            }

            if (response.data.status === 200 && response.data.message === "Password didn't match") {
                toast({
                    title: "Password didn't match",
                    status: "info",
                    duration: "2000",
                    isClosable: false
                })

                return;
            }


        } catch (err) {

            console.log("err --> ", err)

            if (err.response) {
                toast({
                    title: err.response.data.message,
                    status: 'warning',
                    duration: 10000,
                    isClosable: true
                })
            } else {
                toast ({
                    title: err.message,
                    status: 'warning',
                    duration: 10000,
                    isClosable: true
                })
            }
        }
};

export const logout = (toast, navigate) => async (dispatch, getState) => {
    toast({
        title: 'Logged Out Successfully',
        description: 'To resume, sign in again to continue',
        status: 'success',
        duration: 2000,
        isClosable: false
    })
    localStorage.clear();
    navigate("/")
}
