package com.gambit.kiara.adapters

import android.support.v7.widget.RecyclerView
import android.view.ViewGroup
import com.gambit.kiara.models.Submission
import com.gambit.kiara.views.SubmissionItemView

/**
 * Created by itock on 3/25/2018.
 */
class SubmissionListAdapter : RecyclerView.Adapter<SubmissionListAdapter.SubmissionItemViewHolder>() {

    var data = arrayListOf<Submission>()

    override fun getItemCount(): Int = data.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SubmissionItemViewHolder {
        val itemView = SubmissionItemView(parent.context)
        return SubmissionItemViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: SubmissionItemViewHolder, position: Int) {
        holder.view.submission = data[position]
    }

    class SubmissionItemViewHolder(val view: SubmissionItemView) : RecyclerView.ViewHolder(view)
}