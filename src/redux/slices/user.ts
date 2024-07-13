import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface profile {
    about: string
    firstName: string
    lastName: string
    email: string
    image: string
    updatedOn: Date
}
interface userSlice{
    token: string | null,
    profile: profile | null
}

const initialState: userSlice = {
    token: localStorage.getItem('token')? localStorage.getItem('token'): null,
    profile: localStorage.getItem('profile')? JSON.parse(localStorage.getItem('profile') ?? ''): null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload
        },
        setProfile(state, action: PayloadAction<profile>) {
            state.profile = action.payload
        }
    }
})

export const {setToken, setProfile} = userSlice.actions

export default userSlice.reducer