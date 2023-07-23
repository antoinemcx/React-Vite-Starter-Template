import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "../../lib/axios";

const useLogout = (location) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    return async () => {
        await axios('/user/logout', {
            withCredentials: true
        }).catch(() => {});

        setAuth({});
        
        if(location) {
            navigate('/login', { state: { from: location }, replace: true });
        } else { navigate('/login') }
    }
}

export default useLogout;