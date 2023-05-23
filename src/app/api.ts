import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl:"http://localhost:4000/api/v1"});

const apiSlice = createApi({
  baseQuery,
  tagTypes:["User","Post"],
  endpoints:(builder)=>({})
})

export default apiSlice