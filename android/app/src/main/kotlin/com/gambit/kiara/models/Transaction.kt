package com.gambit.kiara.models

import java.util.*

/**
 * Created by itock on 3/25/2018.
 */
class Transaction {

    var id: String? = null

    var houseId: Int = -1

    var housePrice: Long = 0

    var amount: Double = 0.0

    var remaining: Long = 0

    var timestamp: Date? = null
}