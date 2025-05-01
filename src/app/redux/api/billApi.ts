
import { IBill, IMeta } from "@/app/types";
import { tagTypes } from "../tagTypesList";
import { baseApi } from "./baseApi";

export const billApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        bills: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `/bill`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: IBill[], meta: IMeta) => {
                return {
                    bills: response,
                    meta
                }
            },
            providesTags: [tagTypes.bill]
        }),
        createBill: build.mutation({
            query: (data) => ({
                url: "/bill/create-bill",
                method: "POST",
                data,
            }),
            extraOptions: {
                maxRetries: 0,
            },
            invalidatesTags: [tagTypes.bill],
        })
    })
})

export const { useCreateBillMutation, useBillsQuery } = billApi