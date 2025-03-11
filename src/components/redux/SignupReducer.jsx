import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const signupCreds = createSlice({
    name: "Signup",
    initialState: {
        value: {
            username: "",
            password: "",
        }
    },
    reducers: {
        setSignupCreds: (state, action) => {
            state.value = {
                ...state.value,
                [action.payload.key]: action.payload.value
            }
        }
    }
})

export const { setSignupCreds } = signupCreds.actions;
export default signupCreds.reducer;

export const signupUser = (toast, navigate) => async (dispatch, getState) => {
    try {
        const { value } = getState().userSigningUp;
        const response = await axios.post(`${process.env.REACT_APP_TODO_SERVER_URI}/signup`, value)
    
        if (response.data.status === 200) {
            toast({
                title: "User Registered Successfully",
                status: 'success',
                duration: 5000,
                isClosable: true
            })
            navigate("/")
            return
        }

    } catch (err) {

        console.log("err --> ", err)

        toast({
            title: err.response.data.message.includes("User already exists") ? `Account already exists` : err.response.data.message,
            description: err.response.data.message.includes("User already exists") && `Duplicate accounts are not allowed`,
            status: 'warning',
            duration: 5000,
            isClosable: true
        })
    }
}

