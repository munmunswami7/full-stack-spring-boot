import {
    Children,
    createContext, 
    useContext,
    useEffect,
    useState
} from "react"
import { login as performLogin } from "../../services/client"
import {jwtDecode} from "jwt-decode"
import { useAnimationFrame } from "framer-motion"

const AuthContext = createContext({
    customer: null,
    login: () => Promise.resolve(),
    logOut: () => {},
    isCustomerAuthenticated: () => false
})

const AuthProvider = ({children}) => {

    const [customer, setCustomer] = useState(null)

    const setCustomerFromToken = () => {
        let token = localStorage.getItem("access_token")
        if(token){
            const decodedToken = jwtDecode(token)
            setCustomer({
                userName: decodedToken.sub,
                roles: decodedToken.scopes
            })
        }
    }
    useEffect(() => {
        setCustomerFromToken()
    },[])

    const login = async(usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken= res.data.token
                console.log(jwtToken);
                //save the token
                localStorage.setItem("access_token", jwtToken)
                
                const decodeToken = jwtDecode(jwtToken)

                setCustomer({
                    // ...res.data.customerDTO
                    userName: decodeToken.sub,
                    roles: decodeToken.scopes
                })
                resolve(res);
            }).catch(err => { 
                reject(err)
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token")
        setCustomer(null)
    }

    // const isCustomerAuthenticated = () => {
    //     const token = localStorage.getItem("access_token")
    //     if(!token){
    //         return false
    //     }

    //     const {exp: expiration } =jwtDecode(token)
    //     if(Date.now() > expiration * 1000){
    //         logOut()
    //         return false
    //     }
    //     return true
    // }


    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token")
        if (!token) {return false}
        try{
            const decodedToken = jwtDecode(token)
            
            //Look inside the decoded token for a field called exp.
            //If it exists and it’s a number → store it in exp.
            //If it doesn’t exist or isn’t a number → set exp to undefined.”
            //It’s just a safe way of saying:
            //✅ good token → exp = decodedToken.exp
            //❌ bad/missing token → exp = undefined
            const expiration = typeof decodedToken?.exp === "number" ? decodedToken.exp : undefined
            if(!expiration) {return false}

            if(Date.now() > expiration*1000){
                logOut()
                return false
            }
            return true
        }catch(e){
            logOut()
            return false
        }
    }

    return (
        <AuthContext.Provider value={{
            customer,
            login,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
