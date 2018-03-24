package com.gambit.kiara.adapters

import android.support.v7.widget.RecyclerView
import android.view.ViewGroup
import com.gambit.kiara.models.Rumah
import com.gambit.kiara.views.RumahItemView

/**
 * Created by itock on 3/24/2018.
 */
class RumahListAdapter : RecyclerView.Adapter<RumahListAdapter.RumahItemViewHolder>() {
    companion object {

        val data = arrayListOf<Rumah>()
    }
    override fun getItemCount(): Int = data.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RumahItemViewHolder {
        val itemView = RumahItemView(parent.context)
        return RumahItemViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: RumahItemViewHolder, position: Int) {
        holder.view.rumah = data[position]
    }

    class RumahItemViewHolder(val view: RumahItemView) : RecyclerView.ViewHolder(view)
}