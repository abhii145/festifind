import { LoginFormInputs, SignupFormInputs } from "@/app/auth/page"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  user: null as LoginResponse | null,
  loading: false,
  error: null as string | null,
}

interface LoginResponse {
  name: string
  email: string
  _id: string
  role: string
}

export const loginUser = createAsyncThunk<LoginResponse, LoginFormInputs>(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/sign-in`,
        data
      )
      console.log("Logged in successfully!")
      return response.data.details
    } catch (error: any) {
      console.log("Login Failed")
      return rejectWithValue(error.response.data)
    }
  }
)

export const signupUser = createAsyncThunk<LoginResponse, SignupFormInputs>(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/sign-up`,
        data
      )
      console.log("User created successfully!")
      return response.data.details
    } catch (error: any) {
      console.log("Signup Failed")
      return rejectWithValue(error.response.data)
    }
  }
)

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Logged out successfully!")
      return
    } catch (error) {
      console.log("Logout Failed")
      //   return rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.user = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default userSlice.reducer
