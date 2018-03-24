package com.gambit.kiara.http

import android.content.Context
import com.google.gson.FieldNamingPolicy
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Created by itock on 3/24/2018.
 */
object WebService {
    private val BASE_URL = "http://167.99.70.204:3000"
    private val DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"

    lateinit var services: Services

    fun init(context: Context) {
        val gson = GsonBuilder()
                .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
                .setDateFormat(DATE_FORMAT)
                .create()

        val converter = GsonConverterFactory.create(gson)

        val logger = HttpLoggingInterceptor()
        logger.level = HttpLoggingInterceptor.Level.BODY

        val httpClient = OkHttpClient.Builder()
                .addInterceptor(logger)
                .build()

        val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(converter)
                .client(httpClient)
                .build()

        services = retrofit.create(Services::class.java)
    }
}