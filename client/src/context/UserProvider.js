/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    const initState = { 
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "", 
        issues: JSON.parse(localStorage.getItem("issues")) || [],
        userIssues: JSON.parse(localStorage.getItem('userIssues')) || [],
        errMsg: '' 
    }

    const [userState, setUserState] = useState(initState)
    function signup(credentials){
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                console.log(userState.user)
                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token,} = res.data
                localStorage.setItem('token', token)
                
                localStorage.setItem('user', JSON.stringify(user))
                getIssues()
                
                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))
                getUserIssues()
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userIssues')
        localStorage.removeItem('issues')
        setUserState({
            user: {},
            token: "",
            issues: [],
            errMsg: ""
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prev => ({
            ...prev,
            errMsg
        }))
    } 

    function resetAuthErr(){
        setUserState(prev => ({
            ...prev,
            errMsg:""
        }))
    }

    function getIssues(){
        userAxios.get('/api/issue')
            .then(res => {
                localStorage.setItem('issues', JSON.stringify(res.data))
                setUserState(prev => ({
                    ...prev,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserIssues(){
        userAxios.post(`/api/issue/${userState.user._id}`, )
            .then(res => {
                localStorage.setItem('userIssues', JSON.stringify(res.data))
                setUserState(prev => ({
                    ...prev,
                    userIssues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addIssue(newTodo){
        userAxios.post("/api/issue", newTodo)
            .then(res => {
               
                setUserState(prev => ({
                    ...prev,
                    issues: [...prev.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteIssue(id){
        userAxios.delete(`/api/issue/${id}`)
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    issues: prev.issues.filter((issue) => issue._id !== id)
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        getUserIssues()
        getIssues()
    }, [])

    return(
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                addIssue,
                logout,
                resetAuthErr,
                deleteIssue,
                setUserState,
                getIssues,
                userState,
                userAxios
            }}>
            { props.children }
        </UserContext.Provider>
    )
}