import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFromLocalStore } from '../../../utils/storeUtil';

import callApi from "../../requests/requests";

// ------------------------------- Thunk -------------------------------

export const fetchWorkList = createAsyncThunk('works/fetchWorkList', async () => {
  const payload = {
    path: '/api/user/works/' + getFromLocalStore('userEntity', 'user'),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getFromLocalStore('userEntity', 'jwttoken')
    }
  }

  const data = await callApi(payload)
  return data;
});

export const addNewWork = createAsyncThunk('works/addNewWork', async (work) => {
  const payload = {
    path: '/api/work/add',
    requestBody: work,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getFromLocalStore('userEntity', 'jwttoken')
    }
  }

  const data = await callApi(payload)
  return data;
});

// ------------------------------- Slice -------------------------------

const initialState = {
  workEntities: [],
  status: 'idle',
  error: null
}

export const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchWorkList.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchWorkList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        console.log(action.payload);
        state.workEntities = action.payload
      })
      .addCase(fetchWorkList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewWork.fulfilled, (state, action) => {
        state.workEntities.push(action.payload)
      })
  }
});

// ------------------------------- Selectors -------------------------------

export const selectAllWorks = state => state.work.workEntities
export const selectWorkStatus = state => state.work.status


// Action creators are generated for each case reducer function
export const { GET_USER_WORK_LIST } = workSlice.actions

export default workSlice.reducer