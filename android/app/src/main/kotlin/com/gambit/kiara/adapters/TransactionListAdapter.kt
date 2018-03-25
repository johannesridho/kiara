package com.gambit.kiara.adapters

import android.support.v7.widget.RecyclerView
import android.view.ViewGroup
import com.gambit.kiara.models.Transaction
import com.gambit.kiara.views.TransactionItemView

/**
 * Created by itock on 3/25/2018.
 */
class TransactionListAdapter : RecyclerView.Adapter<TransactionListAdapter.TransactionItemViewHolder>() {

    var data = arrayListOf<Transaction>()

    override fun getItemCount(): Int = data.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TransactionItemViewHolder {
        val itemView = TransactionItemView(parent.context)
        return TransactionItemViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: TransactionItemViewHolder, position: Int) {
        holder.view.transaction = data[position]
    }

    class TransactionItemViewHolder(val view: TransactionItemView) : RecyclerView.ViewHolder(view)
}