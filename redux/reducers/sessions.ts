import { createSlice } from '@reduxjs/toolkit'
import { nearBy, nearByLocation, allSessions, createSets, getSessionSets } from '@/api/sessions'
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

export interface Set {
  _id: string
  session: string
  name: string
  players: string[]
  status: string
  createdAt: string
  updatedAt: string
}

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
  all: MatchSession[]
  pagination: AllSessionsResponse['pagination'] | null
  
  // Sets state
  sets: Set[]
  loadingSets: boolean
  errorSets: string | null
  creatingSet: boolean
  errorCreatingSets: string | null

  loadingSessions: boolean
  loadingPitches: boolean
  loadingAll: boolean

  errorSessions: string | null
  errorPitches: string | null
  errorAll: string | null
}

const initialState: State = {
  sessions: [],
  pitches: [],
  all: [],
  pagination: null,

  // Sets initial state
  sets: [],
  loadingSets: false,
  errorSets: null,
  creatingSet: false,
  errorCreatingSets: null,

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
  reducers: {
    clearSets: (state) => {
      state.sets = []
      state.errorSets = null
    },
  },
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

    // 🔥 Create Sets
    builder.addCase(createSets.pending, (state) => {
      state.creatingSet = true
      state.errorCreatingSets = null
    })
    builder.addCase(createSets.fulfilled, (state, { payload }) => {
      state.sets = payload
      state.creatingSet = false
    })
    builder.addCase(createSets.rejected, (state, action) => {
      state.creatingSet = false
      state.errorCreatingSets = action.error.message || 'Failed to create sets'
    })

    // 🔥 Get Session Sets
    builder.addCase(getSessionSets.pending, (state) => {
      state.loadingSets = true
      state.errorSets = null
    })
    builder.addCase(getSessionSets.fulfilled, (state, { payload }) => {
      state.sets = payload
      state.loadingSets = false
    })
    builder.addCase(getSessionSets.rejected, (state, action) => {
      state.loadingSets = false
      state.errorSets = action.error.message || 'Failed to fetch sets'
    })
  },
})

export const { clearSets } = sessionSlice.actions
export default sessionSlice.reducer