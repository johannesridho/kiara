package com.gambit.kiara.views

import android.content.Context
import android.view.LayoutInflater
import android.widget.RelativeLayout
import com.gambit.kiara.R
import com.gambit.kiara.models.Submission
import kotlinx.android.synthetic.main.layout_submission_item.view.*
import java.text.NumberFormat
import java.util.*

/**
 * Created by itock on 3/25/2018.
 */
class SubmissionItemView : RelativeLayout {

    constructor(context: Context) : super(context) {
        init(context)
    }

    var submission: Submission? = null
        set(value) {
            field = value

            textHouseName.text = submission?.houseName
            textStatus.text = submission?.status
            textMonthly.text = "Rp${NumberFormat.getNumberInstance(Locale("id")).format(submission?.monthly?.toLong())},00"
        }

    var actionListener: SubmissionActionListener? = null

    private fun init(context: Context) {
        LayoutInflater.from(context).inflate(R.layout.layout_submission_item, this, true)

        button.setOnClickListener { actionListener?.onItemClick(submission?.houseId!!, submission?.houseName!!) }
    }

    interface SubmissionActionListener {
        fun onItemClick(houseId: Int, houseName: String)
    }
}