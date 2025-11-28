/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit"
import apiCall from "./apiCall"
import { AsyncThunkConfig, sessionPayload } from "@/components/typings/api"
import { MatchSession, pitchSessions } from "@/redux/reducers/sessions"
import axiosInstance from "./axios"

export const nearBy = createAsyncThunk<
  MatchSession[],
  sessionPayload,
  AsyncThunkConfig
>('/nearby', async (payload, thunkAPI) => {
  console.log('pay', payload)

  return apiCall(
    axiosInstance.get('/i-one/sessions/nearby-sessions', {
      params: payload, 
    }),
    thunkAPI
  )

})

export const nearByLocation = createAsyncThunk<
  pitchSessions[],
  sessionPayload,
  AsyncThunkConfig
>('/nearbyLocation', async (payload, thunkAPI) => {
  console.log('pay', payload)

  return apiCall(
    axiosInstance.get('/i-one/location/nearby', {
      params: payload, 
    }),
    thunkAPI
  )
})
