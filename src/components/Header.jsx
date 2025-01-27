// import { useState, useEffect } from 'react';
import { Button, Image, Input, InputGroup, InputLeftElement, useToast } from "@chakra-ui/react"
import Logo from "./ToDo’s.png"
import { useNavigate } from "react-router-dom"
import { Search2Icon } from "@chakra-ui/icons";

const Header = (props) => {
    const navigate = useNavigate();

    const labels = {
        "login" : "Login",
        "register" : "Register",
        "logout" : "Signout"
    }

    const toast = useToast()


    const handleInputField = (value) => {
        // const responseValue = setTimeout(() => {
        //     console.log('input capture ---> ', value)
        //     props.inputCapture(value);
        // }, 2000)

        // return () => clearTimeout(responseValue)

        props.inputCapture(value)
    }

    return (
        <div
            style={{
                height: "10vh",
                margin: "0% 5%",
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center",
            }}
        >
            <Image 
                boxSize='10vh'
                objectFit="cover"
                src={Logo}
                alt="ToDo's Logo"
            />
            
            {props.search && (
                <div style={{ width: '50%', marginRight: '5%'}}>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <Search2Icon 
                                color='black' 
                            />
                        </InputLeftElement>
                        <Input 
                            type='text'
                            variant='filled'
                            color='black'
                            placeholder='Search a Todo'
                            style={{ backgroundColor: 'white', color: 'black' }}
                            focusBorderColor='transparent'
                            // _focus={{
                            //     borderColor: 'transparent',
                            //     // boxShadow: '0 0 0 1px linear-gradient(to bottom, blue, orange)'
                            //   }}
                            onInputCapture={(e) => handleInputField(e.target.value)}
                            onKeyDownCapture={(e) => {
                                if (e.key === 'Enter')
                                    props.enteredInput()
                            }}
                        />
                    </InputGroup>
                </div>
            )}

            { props.name && (
                <Button
                    onClick={() => {
                        if (props.name === "login")
                            navigate("/")
                        if (props.name === "register")
                            navigate("/register")
                        if (props.name === "logout") {
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
                    }}
                >
                    { labels[props.name] }
                </Button>
            )}
        </div>
    )
}

export default Header;