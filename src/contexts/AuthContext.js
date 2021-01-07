import React, {useContext, useState, useEffect} from 'react';
import { auth } from '../firebase'
import axios from 'axios';
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)
    function signup(name,email, password) {
        const params = new URLSearchParams()
        params.append('name', name)
        params.append('email', email)
        params.append('password', password)

       return axios.post(`http://localhost:8000/api/v1/user/register`, params)
            .then(res => {
                console.log(res.data)
                setCurrentUser(res.data)
                setLoading(false)
            })


    }
    function login(email, password) {

        const params = new URLSearchParams()
        params.append('email', email)
        params.append('password', password)

        return axios.post(`http://localhost:8000/api/v1/user/login`, params)
            .then(res => {
                console.log(res.data)
                setCurrentUser(res.data)
                setLoading(false)
            })
    }
    function logout() {

        return axios.post(`http://localhost:8000/api/v1/user/logout`)
            .then(res => {
                console.log(res)
                setCurrentUser(null)
                setLoading(false)
            })
    }
    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false)
        })
        auth.signOut();
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
//
// import React, {useContext, useState, useEffect} from 'react';
// import { auth } from '../firebase'
// const AuthContext = React.createContext();
//
// export function useAuth() {
//     return useContext(AuthContext)
// }
//
// export default function AuthProvider({children}) {
//     const [currentUser, setCurrentUser] = useState({})
//     const [loading, setLoading] = useState(true)
//     function signup(email, password) {
//
//        return auth.createUserWithEmailAndPassword(email, password);
//     }
//     function login(email, password) {
//
//         return auth.signInWithEmailAndPassword(email, password);
//     }
//     function logout() {
//
//         return auth.signOut();
//     }
//     useEffect(()=> {
//        const unsubscribe = auth.onAuthStateChanged((user) => {
//            setCurrentUser(user);
//            setLoading(false)
//         })
//         return unsubscribe
//     }, [])
//
//
//     const value = {
//         currentUser,
//         signup,
//         login,
//         logout
//     }
//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     )
// }
