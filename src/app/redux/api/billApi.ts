
import { tagTypes } from "../tagTypesList";
import { baseApi } from "./baseApi";

export const billApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        
        createBill: build.mutation({
            query: (data) => ({
                url: "/bill/create-bill",
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.bill],
        })
    })
})

export const { useCreateBillMutation } = billApi