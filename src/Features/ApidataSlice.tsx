import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import weatherApi from "../Apis/weatherApi";
import { API_KEY } from "../Apis/weatherApiKey";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    initial: {},
    recent: [],
    fav: [],
    liked: [],
  },
  reducers: {
    // favAdd: (state: any, { payload }) => {
    //   state.fav.push(payload);
    // },
    favAdd: (state:any, {payload}) => {
      let isPresent = false;
      for (let item of state.fav) {
        if (item.id === payload.id) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        state.fav.unshift(payload);
      }
    },
    favRemove: (state, { payload }) => {
      state.fav = state.fav.filter((user: any) => user.id !== payload.id);
    },
    removeAllFav: (state) => {
      state.fav = [];
    },
    clearAllrecent: (state) => {
      state.recent = [];
    },
    // recentAdd: (state: any, { payload }) => {
    //   state.recent.push(payload);
    // },
    addLiked: (state: any, { payload }) => {
      state.liked.push(payload);
    },
    removeAllliked: (state) => {
      state.liked = [];
    },
    removeOneliked: (state, { payload }) => {
      state.liked = state.liked.filter((user: any) => user !== payload);
    },
    recentAdd: (state: any, {payload}) => {
      let isPresent = false;
      for (let item of state.recent) {
        if (item.id === payload.id) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        state.recent.unshift(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state: any, { payload }) => {
      console.log("fetched Successfully");
      return { ...state, initial: payload };
    });
  },
});

export const fetchWeather = createAsyncThunk(
  "weather/fetchweather",
  async (payload: any) => {
    // const location = "Udupi"
    const response = await weatherApi.get(
      `weather?q=${payload}&units=imperial&appid=${API_KEY}`
    );
    return response.data;
  }
);
export const getData = (state: any) => state.weather.initial;
export const getFav = (state: any) => state.weather.fav;
export const getRecent = (state: any) => state.weather.recent;
export const getLiked = (state: any) => state.weather.liked;
export const {
  favAdd,
  recentAdd,
  favRemove,
  removeAllFav,
  clearAllrecent,
  addLiked,
  removeOneliked,
  removeAllliked,
} = weatherSlice.actions;
export default weatherSlice.reducer;
