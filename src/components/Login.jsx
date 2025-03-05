import { useEffect, useState } from "react";  
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { Button, Image, Input, Stack, Text, useToast } from "@chakra-ui/react";
import Header from "./Header";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "./assets/icons/google-icon.svg"

import "./Login.css"

const LoginUser = () => {

    const toast = useToast();
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(false)

    const [loginCreds, setLoginCreds] = useState({
        username: '',
        password: ''
    })


    const googleLogin = useGoogleLogin({
        onSuccess: async({ code }) => {
            console.log('code --> ', code)
            const response = await axios.post(`${process.env.REACT_APP_TODO_SERVER_URI}/google-login`, { code })
            console.log("token --> ", response)

            if (response.data.status === 200 && response.data.data.userID) {
                toast({
                    title: "Credentials Verified Successfully",
                    status: 'success',
                    duration: 10000,
                    isClosable: true
                })
                localStorage.setItem('userID', response.data.data.userID)
                localStorage.setItem('token', response.data.data.token)
                navigate("/todo-dashboard")
            }
        },
        flow: 'auth-code',
        onError: (err) => {
            toast({
                title: "Some error occurred. Please retry after sometime",
                status: 'error',
                duration: 10000,
                isClosable: true
            })
            console.log("err --> ", err)
        }
    })

    const handleUsername = (e) => {
        const typeHandler = setTimeout(() => {
            setLoginCreds({
                ...loginCreds,
                username: e.target.value
            })
        }, 800)


        return () => clearTimeout(typeHandler)
    }

    const handlePassword = (e) => {
        const typeHandler = setTimeout(() => {
            setLoginCreds({
                ...loginCreds,
                password: e.target.value
            })
        }, 800)

        return () => clearTimeout(typeHandler)
    }

    const handleCredsSubmit = async () => {
        console.log("Login Credentials ---> ", loginCreds)

        try {
            const response = await axios.post(`${process.env.REACT_APP_TODO_SERVER_URI}/login`, loginCreds)
        
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
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth < 512);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    console.log('windowWidth --> ', windowWidth)

    return (
        <div className="login-container">
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
                                fontSize: 20,
                                marginBottom: "2em"
                            }}
                        >
                            <p>🤟 Let's get started ...</p>
                        </div>
                        <div
                            style={{
                                // backgroundColor: 'honeydew',
                                height: "30vh",
                                // width: "50vw",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Stack spacing="2em">
                                { windowWidth ? (
                                    <>
                                        <div>
                                            <Input
                                                type="text"
                                                placeholder="Username"
                                                onInputCapture={handleUsername}
                                                onKeyDownCapture={(e) => {
                                                    if (e.key === "Enter")
                                                        handleCredsSubmit();
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Input 
                                                type='password'
                                                placeholder="Password"
                                                onInputCapture={handlePassword}
                                                onKeyDownCapture={(e) => {
                                                    if (e.key === "Enter")
                                                        handleCredsSubmit();
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Button 
                                                variant="outline"
                                                onClick={handleCredsSubmit}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </Stack> 
                        </div>
                        <div className="line-with-text">
                            <button
                                id="button-or"
                            >
                                OR
                            </button>
                        </div>
                        <div>
                            <Button 
                                variant="outline"
                                onClick={() => googleLogin()}
                                style={{ borderRadius: 100 }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'row', gap: 10}}>
                                    <Image src={GoogleIcon} alt="Google Icon" />
                                    <Text>Sign in using Google</Text>
                                </div>
                            </Button>
                        </div>
                    </Stack>

                </div>
            
            </div>
        </div>
    )
}

export default LoginUser