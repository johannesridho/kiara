package com.gambit.kiara.http

import com.gambit.kiara.models.Rumah
import com.gambit.kiara.models.Submission
import com.gambit.kiara.models.Transaction
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

/**
 * Created by itock on 3/24/2018.
 */
interface Services {

    @GET("submission/customer/{customer_id}")
    fun getSubmissionListByCustomerId(@Path("customer_id") customerId: String) : Call<Response<List<Submission>>>

    @GET("transaction/customer/{customer_id")
    fun getTransactionListByCustomerId(@Path("customer_id") customerId: String) : Call<List<Transaction>>

    @GET("house/list/{keyword}")
    fun getRumahListByKeyword(@Path("keyword") keyword: String) : Call<Response<List<Rumah>>>
}