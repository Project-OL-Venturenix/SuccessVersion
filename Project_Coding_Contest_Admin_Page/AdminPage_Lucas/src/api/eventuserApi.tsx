import axios from "axios";
import BASE_URL from '../BaseUrl';


export const addEventUser = async (userId: string, accessToken: string, eventId: string) => {
    try {
        console.log(accessToken)
        const response = await axios.patch(
            `${BASE_URL}/api/join?userId=${userId}&eventId=${eventId}`,
            null,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch
        (error) {
        console.error(error);
        throw error;
    }
};