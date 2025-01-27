import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import Header from "./Header"
import axios from "axios";



const Signup = () => {

    const toast = useToast();
    const navigate = useNavigate();

    const [registerCreds, setRegisterCreds] = useState({
        username: '',
        password: ''
    })

    const handleUsername = (e) => {
        const typeHandler = setTimeout(() => {
            setRegisterCreds({
                ...registerCreds,
                username: e.target.value
            })
        }, 800)


        return () => clearTimeout(typeHandler)
    }

    const handlePassword = (e) => {
        const typeHandler = setTimeout(() => {
            setRegisterCreds({
                ...registerCreds,
                password: e.target.value
            })
        }, 800)

        return () => clearTimeout(typeHandler)
    }


    const handleCredsSubmit = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_TODO_SERVER_URI}/signup`, registerCreds)
        
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
                title: err.response.data.message.includes("User already exists") && `Account already exists`,
                // description: err.response.data.message.includes("User already exists") && `Sorry! Duplicate accounts are not allowed`,
                // description: err.message,
                status: 'warning',
                duration: 5000,
                isClosable: true
            })
        }
    }


    return (
        <div className="signup-container">
             <div
                style={{
                    height: "10vh",
                    backgroundColor: "#ffcc00"
                }}
            >

                <Header name={"login"}/>

            </div>
            <div
                style={{
                    // backgroundColor: "cyan",
                    height: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}  
            >
                <div
                    style={{
                        // backgroundColor: 'lightgreen',
                        height: "50vh",
                        width: "70vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <Stack spacing="5%">
                        <div
                            style={{
                                fontWeight: 700,
                                fontSize: 20
                            }}
                        >
                            <p>👋 Hey! Register yourself to get started</p>
                        </div>
                        <div
                            style={{
                                // backgroundColor: 'honeydew',
                                height: "30vh",
                                width: "50vw",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Stack spacing="2em">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <p style={{ marginRight: "1em" }}>Username: </p>
                                    <Input
                                        type="text"
                                        onInputCapture={handleUsername}
                                        onKeyDownCapture={(e) => {
                                            if (e.key === "Enter")
                                                handleCredsSubmit();
                                        }}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <p style={{ marginRight: "1em" }}>Password: </p>
                                    <Input 
                                        type='password'
                                        onInputCapture={handlePassword}
                                        onKeyDownCapture={(e) => {
                                            if (e.key === "Enter")
                                                handleCredsSubmit();
                                        }}
                                    />
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <Button 
                                        variant="outline"
                                        onClick={handleCredsSubmit}
                                    >
                                        Signup
                                    </Button>
                                </div>
                            </Stack>
                        </div>
                    </Stack>

                </div>

            </div>
        </div>
    )
}


export default Signup;