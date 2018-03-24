package com.gambit.kiara.http

import com.gambit.kiara.models.Rumah
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

/**
 * Created by itock on 3/24/2018.
 */
interface Services {
    @GET("house/list/{keyword}")
    fun getRumahListByKeyword(@Path("keyword") keyword: String) : Call<Response<List<Rumah>>>
}