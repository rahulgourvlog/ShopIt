import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import React from 'react'
import { userApi } from './userApi'

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({baseUrl:'/api/v1'}),
    endpoints:(buider)=>(
        { 
            register:buider.mutation({
            query(body){
                return{
                    url: `/register`,
                    method: 'POST',
                    body,
                }
            },
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                await queryFulfilled;
                await dispatch(userApi.endpoints.getMe.initiate(null))
                            } 
        }),
            login:buider.mutation({
                query(body){
                    return{
                        url: `/login`,
                        method: 'POST',
                        body,
                    }
                },
                async onQueryStarted(arg,{dispatch,queryFulfilled}){
                    try{
                        await queryFulfilled;
                        await dispatch(userApi.endpoints.getMe.initiate(null))
                    }
                    catch(err){
                        console.log('err',err)
                        //dispatch(err)
                    }
                  
                                } 
            }),

            logout:buider.query({
                query:()=>'/logout'
            })
           
        }
    )

})

export const {useLoginMutation,useRegisterMutation,useLazyLogoutQuery}=authApi
//useLogoutQuery --> it will directly logout the user 
//useLazyLogoutQuery--> The naming convention useLazyLogoutQuery suggests that it's a React hook used to execute 
//a logout query lazily, meaning it's triggered only when needed. 
