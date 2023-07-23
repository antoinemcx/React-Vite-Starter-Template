import axios from "../../lib/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refreshToken = async () => {
        const response = await axios('/user/refreshToken', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                username: response.data.username,
                accessToken: response.data.accessToken
            }
        });

        return response.data.accessToken;
    }

    return refreshToken;
}

export default useRefreshToken