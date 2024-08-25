import { useState } from "react";  
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import Header from "./Header";

const LoginUser = () => {

    const toast = useToast();
    const navigate = useNavigate();

    const [loginCreds, setLoginCreds] = useState({
        username: '',
        password: ''
    })

    const handleUsername = (e) => {
        const typeHandler = setTimeout(() => {
            setLoginCreds({
                ...loginCreds,
                username: e.target.value
            })
        }, 3000)


        return () => clearTimeout(typeHandler)
    }

    const handlePassword = (e) => {
        const typeHandler = setTimeout(() => {
            setLoginCreds({
                ...loginCreds,
                password: e.target.value
            })
        }, 3000)

        return () => clearTimeout(typeHandler)
    }


    const handleCredsSubmit = async () => {
        console.log("Login Credentials ---> ", loginCreds)

        try {
            const response = await axios.post("http://localhost:8082/todo/login", loginCreds)
        
            console.log("response -->", response.data)

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

            toast({
                title: err.response.data.message,
                status: 'warning',
                duration: 10000,
                isClosable: true
            })
        }
    }



    return (
        <div class="login-container">
            <div
                style={{
                    height: "10vh",
                    backgroundColor: "#ffcc00"
                }}
            >

                <Header name={"register"}/>
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
                            <p>🤟 Let's get started ...</p>
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
                                <div 
                                    style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
                                >
                                    <Button 
                                        variant="outline"
                                        onClick={handleCredsSubmit}
                                    >
                                        Login
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

export default LoginUser