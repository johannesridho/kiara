package com.gambit.kiara.http

import com.google.gson.annotations.SerializedName

/**
 * Created by itock on 3/24/2018.
 */
class Response<T> {

    @SerializedName("result")
    var data: T? = null
}