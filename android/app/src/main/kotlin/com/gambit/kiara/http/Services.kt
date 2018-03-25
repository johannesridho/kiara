package com.gambit.kiara.http

import com.gambit.kiara.models.Rumah
import com.gambit.kiara.models.Submission
import com.gambit.kiara.models.Transaction
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.*

/**
 * Created by itock on 3/24/2018.
 */
interface Services {

    @GET("submission/customer/{customer_id}")
    fun getSubmissionListByCustomerId(@Path("customer_id") customerId: String) : Call<Response<List<Submission>>>

    @GET("transaction")
    fun getTransactionListByCustomerId(@Query("customer_id") customerId: String, @Query("house_id") houseId: Int) : Call<Response<List<Transaction>>>

    @GET("house/list/{keyword}")
    fun getRumahListByKeyword(@Path("keyword") keyword: String) : Call<Response<List<Rumah>>>

    @FormUrlEncoded
    @POST("submission")
    fun createSubmission(@Field("customer_id") customerId: String, @Field("house_id") houseId: Int, @Field("house_price") housePrice: Long, @Field("interest") interest: Int, @Field("duration_month") duration: Int) : Call<ResponseBody>
}