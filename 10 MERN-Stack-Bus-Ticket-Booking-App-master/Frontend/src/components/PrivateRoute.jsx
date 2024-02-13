import { message } from 'antd';
import axios from 'axios';
import React, { Children, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { setUsers } from '../redux/userSlice';
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import Loader from './loader';
import DefaultPage from './DefaultPage';

function PrivateRoutes({children }) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.users)
   const{loading} = useSelector(state => state.alert)
    const navigate = useNavigate()
    const validateToken = async() => {
        try {
            dispatch(ShowLoading())
            const response = await axios.post("/api/users/get-user-by-id" , {} ,{headers: {
                Authorization :  `Bearer ${localStorage.getItem('token')}`
            } 
        })
        if(response.data.success){
            
            dispatch(HideLoading())
            dispatch(setUsers(response.data.data))

        }else{
            localStorage.removeItem('token')
            message.error("Invalid Token")
            dispatch(HideLoading())
            navigate('/login')
        }
        
        } catch (error) {
            localStorage.removeItem('token')
            message.error("Invalid Token")
            dispatch(HideLoading())
            navigate('/login')
        }
    }
    useEffect(() => {
        
        const token = localStorage.getItem("token")
        if(token){
            validateToken();
        }
        else{
            dispatch(HideLoading())
            navigate("/login")
        }

    }, [])
    


  return (
    <div>{user && <DefaultPage>{children}</DefaultPage>} </div>
  )
}

export default PrivateRoutes