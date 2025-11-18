import axios from 'axios';

export const BASE_URL = "http://localhost/batcave/backend/public";
// export const BASE_URL = "http://localhost/BatCave/backend/public";

// assuming BASE_URL is http://localhost:8080

export const axiosMain = axios.create({
    baseURL : BASE_URL
    // withCredentials : true // no reason for now.
});

export const apiGet = async (url : string)  => {
    try {
        const response = await axiosMain.get(url); //   essentially this will be "http://localhost:8080/{url}"
        return {response : response , data : response.data};
    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.error("Data: " , error.response?.data);
            console.error("Full error: ", error)

            console.error("Status: " , error.response?.status);
            return;
        }
        else {
          // Non-Axios error (network issues, etc.)
          console.error('Unexpected error:', error);
        }
        return;
    }
} 

export const apiPost = async (url : string, data : object) => {
    try {
        const response = await axiosMain.post(url , data, {
            headers : {
                'Content-Type': 'application/json'
            }
        })  // url could be /reservations action=POST
        return {response : response , data : response.data};
    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.error("Data: ", error.response?.data)
            console.error("Status: ", error.response?.status)
            console.error("Full error: ", error)

            return;
        } else {
            console.error("Unexpected error: " , error);
            return;
        }
    }
}

export default axiosMain;

