import axios from 'axios';

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getCustomers = async () => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            getAuthConfig()
        )
        console.log("getCustomers response: ",res.data);
        return res
    }catch (e){
        throw e
    }
}

export const saveCustomer = async(customer) => {
    try{
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            customer
        )
        console.log("saveCustomer response: ", res.data);
        
        return res
    }catch(e) {
        throw e
    }
}

export const deleteCustomer = async(id) => {
    try{
        const res =  await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            getAuthConfig()
        )
        console.log("deleteCustomer response: ", res.data);
        return res

    }catch(e) {
        throw e
    }
}

export const updateCustomer = async(id, update) => {
    try{
        const res = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            update,
            getAuthConfig()
        )
        console.log("updateCustomer response: ", res.data);
        return res
    }catch(e) {
        throw e
    }
}

export const login = async(userNameAndPassword) => {
    try{
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
            userNameAndPassword
        )
        console.log("login response: ", res.data);
        return res
    }catch(e){
        throw(e);
    }
}