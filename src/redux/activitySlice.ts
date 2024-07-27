import { createSlice } from '@reduxjs/toolkit'


const initialState: any = {   
 activities: []
} 

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities : (state,action) => {
     const newActivity = action.payload.activity;
     return { ...state, activities: {...state.activities, newActivity}}
    },
  },
})

export const { setActivities} = activitySlice.actions
export default activitySlice.reducer
