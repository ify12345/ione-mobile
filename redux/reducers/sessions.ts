import { createSlice } from '@reduxjs/toolkit'
import { nearBy, nearByLocation, allSessions } from '@/api/sessions'
import { Team } from '@/components/typings'

export interface MatchSession {
  _id: string
  session: string
  teamOne?: Team
  teamTwo?: Team
  teamOneScore: number
  teamTwoScore: number
  initials?: string
  matchType: string
  isStarted: boolean
  __v: number
}

export interface pitchSessions {
  _id: string
  name: string
  address: string
  booked: boolean
  pitchPhoto: string
}

// New interface for allSessions response
export interface AllSessionsResponse {
  pagination: {
    limit: number
    page: number
    total: number
    totalPages: number
  }
  sessions: MatchSession[]
}

interface State {
  sessions: MatchSession[]
  pitches: pitchSessions[]
  all: MatchSession[] // New field for all sessions
  pagination: AllSessionsResponse['pagination'] | null // Optional: store pagination info

  loadingSessions: boolean
  loadingPitches: boolean
  loadingAll: boolean // New loading state

  errorSessions: string | null
  errorPitches: string | null
  errorAll: string | null // New error state
}

const initialState: State = {
  sessions: [],
  pitches: [],
  all: [],
  pagination: null,

  loadingSessions: false,
  loadingPitches: false,
  loadingAll: false,

  errorSessions: null,
  errorPitches: null,
  errorAll: null,
}

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // 🔥 Nearby sessions (Match sessions)
    builder.addCase(nearBy.pending, (state) => {
      state.loadingSessions = true
      state.errorSessions = null
    })
    builder.addCase(nearBy.fulfilled, (state, { payload }) => {
      state.sessions = payload
      state.loadingSessions = false
    })
    builder.addCase(nearBy.rejected, (state, action) => {
      state.loadingSessions = false
      state.errorSessions = action.error.message || 'Failed to fetch sessions'
    })

    // 🔥 Nearby pitches
    builder.addCase(nearByLocation.pending, (state) => {
      state.loadingPitches = true
      state.errorPitches = null
    })
    builder.addCase(nearByLocation.fulfilled, (state, { payload }) => {
      state.pitches = payload
      state.loadingPitches = false
    })
    builder.addCase(nearByLocation.rejected, (state, action) => {
      state.loadingPitches = false
      state.errorPitches = action.error.message || 'Failed to fetch pitches'
    })

    // 🔥 All sessions
    builder.addCase(allSessions.pending, (state) => {
      state.loadingAll = true
      state.errorAll = null
    })
    builder.addCase(allSessions.fulfilled, (state, { payload }) => {
      state.all = payload.sessions
      state.pagination = payload.pagination
      state.loadingAll = false
    })
    builder.addCase(allSessions.rejected, (state, action) => {
      state.loadingAll = false
      state.errorAll = action.error.message || 'Failed to fetch all sessions'
    })
  },
})

export default sessionSlice.reducer