import axios from "axios";
import BASE_URL from '../BaseUrl';


export const addEventQuestion = async (questionId: string, accessToken: string, eventId: string) => {
    try {
        console.log(accessToken)
        const response = await axios.patch(
            `${BASE_URL}/api/addEventQuestion/event/${eventId}/question/${questionId}`,
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