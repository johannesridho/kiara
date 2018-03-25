package com.gambit.kiara.views

import android.content.Context
import android.view.LayoutInflater
import android.widget.RelativeLayout
import com.gambit.kiara.R
import com.gambit.kiara.models.Transaction
import kotlinx.android.synthetic.main.layout_transaction_item.view.*
import java.text.NumberFormat
import java.text.SimpleDateFormat
import java.util.*

/**
 * Created by itock on 3/25/2018.
 */
class TransactionItemView : RelativeLayout {

    constructor(context: Context) : super(context) {
        init(context)
    }

    var transaction: Transaction? = null
        set(value) {
            field = value

            textAmount.text = "Rp${NumberFormat.getNumberInstance(Locale("id")).format(transaction?.amount?.toLong())},00"
            textTimestamp.text = SimpleDateFormat("dd-MM-yyyy").format(transaction?.timestamp)
        }

    private fun init(context: Context) {
        LayoutInflater.from(context).inflate(R.layout.layout_transaction_item, this, true)
    }
}