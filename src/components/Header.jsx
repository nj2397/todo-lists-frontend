import { Button, Image } from "@chakra-ui/react"
import Logo from "./ToDo’s.png"
import { useNavigate } from "react-router-dom"

const Header = (props) => {
    const navigate = useNavigate();

    const labels = {
        "login" : "Login",
        "register" : "Register",
        "logout" : "Signout"
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
            { props.name && (
                <Button
                    onClick={() => {
                        if (props.name === "login")
                            navigate("/")
                        if (props.name === "register")
                            navigate("/register")
                        if (props.name === "logout") {
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