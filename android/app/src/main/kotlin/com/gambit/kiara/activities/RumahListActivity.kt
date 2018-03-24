package com.gambit.kiara.activities

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.NavUtils
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import android.view.MenuItem
import android.view.View
import com.gambit.kiara.R
import com.gambit.kiara.adapters.RumahListAdapter
import com.gambit.kiara.http.Response
import com.gambit.kiara.http.WebService
import com.gambit.kiara.models.Rumah
import com.gambit.kiara.views.RumahItemView
import kotlinx.android.synthetic.main.activity_rumah_list.*
import retrofit2.Call
import retrofit2.Callback

/**
 * Created by itock on 3/24/2018.
 */
class RumahListActivity : AppCompatActivity(), RumahItemView.RumahActionListener {

    companion object {
        val EXTRA_KEYWORD = "extra_keyword"

        fun start(context: Context, keyword: String) {
            val intent = Intent(context, RumahListActivity::class.java)
            intent.putExtra(EXTRA_KEYWORD, keyword)
            context.startActivity(intent)
        }
    }

    private val rumahListAdapter = RumahListAdapter()

    private lateinit var keyword: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rumah_list)

        keyword = intent.getStringExtra(EXTRA_KEYWORD)

        setSupportActionBar(toolbar)
        supportActionBar?.title = keyword
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        rumahListAdapter.rumahActionListener = this

        recyclerRumahList.layoutManager = LinearLayoutManager(this)
        recyclerRumahList.adapter = rumahListAdapter

        performGetRumahListByKeyword(keyword)
    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean =
            when (item?.itemId) {
                android.R.id.home -> {
                    NavUtils.navigateUpFromSameTask(this)
                    true
                }
                else -> super.onOptionsItemSelected(item)
            }

    override fun onItemClick(rumahId: Int?, view: View) {
        RumahDetailActivity.start(this, view, rumahId ?: -1)
    }

    private fun performGetRumahListByKeyword(keyword: String) {
        if (RumahListAdapter.data.isEmpty()) progressLoading.visibility = View.VISIBLE

        WebService.services.getRumahListByKeyword(keyword).enqueue(object : Callback<Response<List<Rumah>>> {
            override fun onFailure(call: Call<Response<List<Rumah>>>?, t: Throwable?) {
                progressLoading.visibility = View.GONE
                Log.e("@@@", t?.message)
            }

            override fun onResponse(call: Call<Response<List<Rumah>>>?, response: retrofit2.Response<Response<List<Rumah>>>?) {
                val rumahList = response?.body()?.data ?: listOf()

                RumahListAdapter.data.clear()
                RumahListAdapter.data.addAll(rumahList)

                recyclerRumahList.adapter.notifyDataSetChanged()

                progressLoading.visibility = View.GONE
            }
        })
    }
}