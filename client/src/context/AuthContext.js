import React,{ createContext,useReducer } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE ={
    user:null,
    isFetching:false,
    isError:false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.isError,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}