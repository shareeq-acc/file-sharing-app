import axiosInstance from "../../../config/axiosInstance";
import { LoginInputType } from "../types";

export const loginApi = async (loginDetails:LoginInputType) => {
    const response = await axiosInstance.post("/auth/login", {
        email:loginDetails.email,
        password:loginDetails.password,
    });
    return response.data;
}

