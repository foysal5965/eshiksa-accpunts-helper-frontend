
import { ICollege, IMeta } from "@/app/types";
import { tagTypes } from "../tagTypesList";
import { baseApi } from "./baseApi";

export const collegeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        colleges:build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `/college`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: ICollege[], meta: IMeta) => {
                return {
                    college: response,
                    meta
                }
            },
            providesTags: [tagTypes.college]
        }),
        addCollege: build.mutation({
            query: (data) => ({
                url: "/college/add-college",
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.college],
        })
    })
})

export const {  useAddCollegeMutation, useCollegesQuery} = collegeApi