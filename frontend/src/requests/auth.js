import { ERR_MSG } from "../constants/constants";
import { defaultHeader } from "./request";

const auth = (() => {
    const setToken = (token) => {
        return sessionStorage.setItem(
            "springFullStackUser",
            JSON.stringify(token)
        );
    };
    const getToken = () => {
        return sessionStorage.getItem("springFullStackUser")
            ? JSON.parse(sessionStorage.getItem("springFullStackUser"))
            : null;
    };
    const removeToken = () => {
        return sessionStorage.removeItem("springFullStackUser");
    };

    const login = ({ endpoint, body, headers }) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(
                    "Sending Request",
                    `${process.env.REACT_APP_BASE_URL}${endpoint}`
                );
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}${endpoint}`,
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: { ...defaultHeader, ...headers },
                    }
                );
                const data = await response.json();

                if (data.error) reject(data.error);
                else if (!data.token) reject(ERR_MSG);
                else {
                    setToken(data.token);
                    resolve(true);
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        login,
        getToken,
    };
})();
export default auth;
