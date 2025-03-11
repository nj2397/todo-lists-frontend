import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const checkToken = localStorage.getItem('token')

    if (!checkToken)
        return <Navigate to="/" replace />
    
    return children

}

export default ProtectedRoute