package com.gambit.kiara.adapters

import android.support.v4.view.PagerAdapter
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import com.bumptech.glide.Glide

/**
 * Created by itock on 3/24/2018.
 */
class GambarPagerAdapter(val gambarList: List<String>) : PagerAdapter() {

    override fun isViewFromObject(view: View, `object`: Any): Boolean = (view == `object` as ImageView)

    override fun getCount(): Int = gambarList.size

    override fun instantiateItem(container: ViewGroup, position: Int): Any {
        val imageView = ImageView(container.context)
        imageView.scaleType = ImageView.ScaleType.CENTER_CROP

        Glide.with(container.context)
                .load(gambarList[position])
                .into(imageView)

        container.addView(imageView)

        return imageView
    }

    override fun destroyItem(container: ViewGroup, position: Int, `object`: Any) {
        container.removeView(`object` as ImageView)
    }
}