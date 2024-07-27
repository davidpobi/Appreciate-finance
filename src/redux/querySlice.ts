import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { QueryState } from '../interfaces/query';


const initialState: QueryState = {   
 options: [],
 query:null
} 

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery : (state,action) => {
      const query = action.payload.query;
      console.log('query',query);
      return { ...state, query: query}
    },
    setOptions : (state,action) => {
      const data = action.payload.data;
      return { ...state, options: data}}
    }  
})

export const { setQuery, setOptions} = querySlice.actions
export default querySlice.reducer
