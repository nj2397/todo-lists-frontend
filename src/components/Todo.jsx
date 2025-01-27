/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import axios from 'axios';
import "./Todo.css"
import { 
    Button, 
    Card, 
    CardBody, 
    CardHeader, 
    IconButton, 
    Input, 
    Modal, 
    ModalBody,
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Stack, 
    Text, 
    useToast
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import Header from './Header';
import { useNavigate } from 'react-router-dom';


const Todo = () => {

    const toast = useToast();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoData, setTodoData] = useState([]);
    const [todoDetails, setTodoDetails] = useState({
        title: '',
        date: '',
        time: '',
    })
    const [editMode, setEditMode] = useState(false);
    const [inputCapture, setInputCapture] = useState("");
    const [getTodoDetails, setGetTodoDetails] = useState({
        title: "",
        date: "",
        time: ""
    })

    const id = localStorage.getItem('userID')
    // const toastRenderOnce = useRef(false)

    const fetchTodos = async () => {

        console.log('id --> ', id)
        try {
            console.log('id --> ', id)
            const response = await axios.get(`${process.env.REACT_APP_TODO_SERVER_URI}/getTodos?id=${id}`, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                    "Content-Type": "application/json" 
                }
            });
            if ( response.data.status === 200 ) {
                setTodoData(response.data.message)
                return;
            }
        } catch (err) {
            if ( err.response.data.status === 401 ) {
                toast({
                    title: "Token Expired",
                    description: "Please login yourself again to continue", 
                    status: 'info',
                    duration: 2000,
                    isClosable: false
                })

                localStorage.clear();
                navigate("/");
                return;
            } 
        }
    }

    useEffect(() => {
        // if (toastRenderOnce.current === true)
        //     fetchTodos();

        // return () => toastRenderOnce.current = true
        fetchTodos();
    }, [])


    const handleTitle = (e) => {
        let titleCapture = setTimeout(() => {
            setTodoDetails({
                ...todoDetails,
                title: e.target.value
            }, 2000)
        })

        return () => clearTimeout(titleCapture)
    }


    const handleDate = (e) => {

        setTodoDetails({
            ...todoDetails,
            date: e.target.value
        })

        return;
    }


    const handleTime = (e) => {

        setTodoDetails({
            ...todoDetails,
            time: e.target.value
        })

        return;
    }


    const handleAddTodo = async () => {
        try {
            console.log('clicked handleAddTodo')
            const response = await axios.post(`${process.env.REACT_APP_TODO_SERVER_URI}/addTodo`, 
                {
                    id,
                    title: todoDetails.title,
                    date: todoDetails.date,
                    time: todoDetails.time
                },
                {
                    headers: {
                        "Authorization": localStorage.getItem('token'),
                        "Content-Type": "application/json"
                    }
                }
            )

            console.log('response --->', response)

            if (response.data.status === 201) {
                toast({
                    title: "Todo Created",
                    description: "Now it can be followed up",
                    status: "success",
                    duration: 5000,
                    isClosable: false
                })

                fetchTodos();
                setIsModalOpen(false)
            } else {
                toast ({
                    title: "Todo failed to get create",
                    status: "error",
                    duration: 2000,
                    isClosable: true
                })
            }
        } catch (err) {
            console.log("err -->", err)
            if (err.response.data.status === 400) {
                toast({
                    title: err.response.data.message,
                    description: "Either update the existing one, or create a new one", 
                    status: "info",
                    duration: 4000,
                    isClosable: false
                })
                setIsModalOpen(false);
            } else if (err.response.data.status === 401) {
                toast({
                    title: "Token Expired",
                    description: "Please login yourself again to continue",
                    status: "info",
                    duration: 2000,
                    isClosable: false
                })
                localStorage.clear();
                navigate("/")
            }
        }
    }

    const handleEditTodo = async () => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_TODO_SERVER_URI}/updateTodo`,
                {
                    id,
                    initialTitle: getTodoDetails.title,
                    title: todoDetails.title,
                    date: todoDetails.date,
                    time: todoDetails.time
                },
                {
                    headers: {
                        "Authorization": localStorage.getItem('token'),
                        "Content-Type": "application/json"
                    }
                }
            )

            if (response.data.status === 200) {
                toast ({
                    title: "Todo Updated",
                    status: "success",
                    duration: 3000,
                    isClosable: false
                })

                fetchTodos();
                setIsModalOpen(false);
                setGetTodoDetails({
                    title: "",
                    date: "",
                    time: ""
                })
                
            }  else if (response.data.status === 401) {
                toast({
                    title: "Token Expired",
                    description: "Please login yourself again to continue",
                    status: "success",
                    duration: 2000,
                    isClosable: false
                })
                localStorage.clear();
                navigate("/")
            } 
        } catch (err) {
            toast ({
                title: "Todo Updation Failed",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: false
            })
        }
    }

    const handleEnteredInput = async () => {
        try {
            console.log('inputCapture --> ', inputCapture)
            const response = await axios.post(`${process.env.REACT_APP_TODO_SERVER_URI}/search`, 
                {
                    id, 
                    title: inputCapture
                },
                {
                    headers: {
                        "Authorization": localStorage.getItem('token'),
                        "Content-Type": "application/json"
                    }
                }
            )

            if (response.data.status === 200) {
                setTodoData(response.data.message)
                return;
            } 

            if (response.data.status === 401) {
                toast({
                    title: "Token Expired",
                    description: "Please login yourself again to continue",
                    status: "success",
                    duration: 2000,
                    isClosable: false
                })
                localStorage.clear();
                navigate("/")
            }
        } catch (err) {
            toast ({
                title: "Todo Updation Failed",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: false
            })
        }
    }

    return ( 
        <> 
            <div className="todo-section-container">
                <div
                    style={{
                        height: "10vh",
                        backgroundColor: "#ffcc00"
                    }}
                >

                    <Header 
                        name={"logout"} 
                        search={"search"} 
                        inputCapture={setInputCapture}
                        enteredInput={handleEnteredInput}
                    />
                </div>
                <div className='top-container'>
                    <p
                        style={{
                            fontWeight: 700,
                            fontSize: 50
                        }}
                    >
                        ToDo's
                    </p>
                </div>
                <div className="bottom-container">
                    {todoData.length > 0 ? (
                        <div className="todo-section-grid">
                            {todoData.map((item, index) => (
                                <div key={index} className="grid-item">
                                    <Card boxShadow="xl" maxW="sm">
                                        <CardHeader>
                                            <Stack direction="row" justifyContent="space-between" width="100%">
                                                <Text
                                                    fontSize="lg"
                                                    fontWeight="500"
                                                >
                                                    {item.title}
                                                </Text>
                                                <IconButton 
                                                    isRound={true}
                                                    variant="outline"
                                                    icon={<EditIcon/>}
                                                    onClick={() => {
                                                        setGetTodoDetails({
                                                            title: item.title,
                                                            date: item.date,
                                                            time: item.time
                                                        })
                                                        setTodoDetails({
                                                            title: item.title,
                                                            date: item.date,
                                                            time: item.time
                                                        });
                                                        setEditMode(true);
                                                        setIsModalOpen(true);
                                                    }}
                                                />
                                            </Stack>
                                        </CardHeader>
                                        <div className="todo-header-divider">
                                            <hr style={{ width: "85%" }} />
                                        </div>
                                        <CardBody>
                                            <Stack
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between"
                                                }}
                                                direction="row"
                                            >
                                                <Text>Date: {item.date}</Text>
                                                <Text>Time: {item.time}</Text>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                height:'50vh',
                                width:'50vw',
                            }}
                        >
                            <Text
                                fontSize='2xl'
                                style={{
                                    fontWeight: '500'
                                }}
                            >
                                😳 Oops! No Todo's Found. <a href="#" className="create-one" onClick={(e) => {e.preventDefault(); setIsModalOpen(true)}}>Create one</a> and schedule yourself for the day.
                            </Text>
                        </div>
                    )}
                </div>
                <div
                    className="todo-add-icon"
                    onClick={() => {
                        setTodoDetails({
                            title: "",
                            date: "",
                            time: ""
                        })
                        setIsModalOpen(true)
                    }}
                >
                    <AddIcon />
                </div>
            </div>


            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setGetTodoDetails({
                        title: "",
                        date: "",
                        time: ""
                    })
                    setTodoDetails({
                        title: "",
                        date: "",
                        time: ""
                    })
                    setEditMode(false)
                    setIsModalOpen(false)
                }}
            >
                <ModalOverlay />
                <ModalContent
                    // className="modal-content"
                    style={{
                        width: "90%", // Default width
                    }}
                    // _media={{
                    //     '@media screen and (max-width: 1024px)': {
                    //         width: "100%", // Width for screens 1024px or less
                    //     },
                    //     '@media screen and (max-width: 768px)': {
                    //         width: "90%", // Width for mobile devices
                    //     },
                    // }}
                >
                    <ModalHeader>
                        Add a ToDo
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        style={{
                            margin: "5% 0%"
                        }}
                    >
                        <Stack
                            spacing={8}
                        >
                            <Input
                                placeholder="ToDo title"
                                type="text" 
                                defaultValue={todoDetails.title}
                                onInputCapture={handleTitle}
                                // ref={}
                                // isDisabled={todoDetails.title || false}
                            />
                            <Input
                                placeholder="Date"
                                type='date'
                                defaultValue={todoDetails.date}
                                onInputCapture={handleDate}
                            />
                            <Input
                                placeholder="Time"
                                type="time"
                                defaultValue={todoDetails.time}
                                onInputCapture={handleTime}
                            />
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        {
                            editMode ? (
                                <Button 
                                colorScheme='blue' 
                                mr={3} 
                                onClick={handleEditTodo}
                            >
                                Update
                            </Button>
                            ) : (
                                <Button 
                                    colorScheme='blue' 
                                    mr={3} 
                                    onClick={handleAddTodo}
                                >
                                    Add
                                </Button>
                            )
                        }
                        <Button
                            onClick={() => {
                                setTodoDetails({
                                    title: "",
                                    date: "",
                                    time: ""
                                })
                                setEditMode(false)
                                setIsModalOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}


export default Todo