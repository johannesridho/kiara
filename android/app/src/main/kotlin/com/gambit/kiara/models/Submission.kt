package com.gambit.kiara.models

import com.google.gson.annotations.SerializedName

/**
 * Created by itock on 3/25/2018.
 */
class Submission {

    var id: String? = null

    var houseName: String? = null

    var housePrice: Long = 0

    var status: String? = null

    @SerializedName("amount")
    var monthly: Double = 0.0
}