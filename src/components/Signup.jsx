import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import Header from "./Header"
import { useDispatch } from "react-redux";
import { setSignupCreds, signupUser } from "./redux/SignupReducer";



const Signup = () => {

    const toast = useToast();
    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(false);
    const dispatch = useDispatch();


    const handleUsername = (e) => {

        dispatch(setSignupCreds({
            key: "username",
            value: e.target.value
        }))
    }

    const handlePassword = (e) => {

        dispatch(setSignupCreds({
            key: "password",
            value: e.target.value
        }))
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
    }, [])


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
                                fontSize: 20,
                                marginBottom: "2em"
                            }}
                        >
                            <p>👋 Hey! Register yourself to get started</p>
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
                                { windowWidth ? 
                                    <>
                                        <div>
                                            <Input
                                                type="text"
                                                onInputCapture={handleUsername}
                                                placeholder="Username"
                                                onKeyDownCapture={(e) => {
                                                    if (e.key === "Enter")
                                                        dispatch(signupUser(toast, navigate))
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="password"
                                                onInputCapture={handlePassword}
                                                placeholder="Password"
                                                onKeyDownCapture={(e) => {
                                                    if (e.key === "Enter")
                                                        dispatch(signupUser(toast, navigate))
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Button 
                                                variant="outline"
                                                onClick={() => dispatch(signupUser(toast, navigate))}
                                            >
                                                Signup
                                            </Button>
                                        </div>
                                    </>
                                    
                                :
                                    <>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <p style={{ marginRight: "1em" }}>Username: </p>
                                            <Input
                                                type="text"
                                                onInputCapture={handleUsername}
                                                onKeyDownCapture={(e) => {
                                                    if (e.key === "Enter")
                                                        dispatch(signupUser(toast, navigate))
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
                                                        dispatch(signupUser(toast, navigate))
                                                }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                            <Button 
                                                variant="outline"
                                                onClick={() => dispatch(signupUser(toast, navigate))}
                                            >
                                                Signup
                                            </Button>
                                        </div>
                                    </>
                                }
                            </Stack>
                        </div>
                    </Stack>

                </div>

            </div>
        </div>
    )
}


export default Signup;