package com.gambit.kiara.views

import android.content.Context
import android.view.LayoutInflater
import android.widget.RelativeLayout
import com.bumptech.glide.Glide
import com.gambit.kiara.R
import com.gambit.kiara.models.Rumah
import kotlinx.android.synthetic.main.layout_rumah_item.view.*
import java.text.NumberFormat
import java.util.*

/**
 * Created by itock on 3/24/2018.
 */
class RumahItemView : RelativeLayout {

    constructor(context: Context) : super(context) {
        init(context)
    }

    var rumah: Rumah? = null
        set(value) {
            field = value

            Glide.with(this)
                    .load(rumah?.gambar?.get(0))
                    .into(imageGambar)

            textNama?.text = rumah?.nama
            textKota?.text = "${rumah?.kabKota}, ${rumah?.propinsi}"
            textHarga?.text = "Rp${NumberFormat.getNumberInstance(Locale("id")).format(rumah?.harga)},00"
        }

    private fun init(context: Context) {
        LayoutInflater.from(context).inflate(R.layout.layout_rumah_item, this, true)
    }
}