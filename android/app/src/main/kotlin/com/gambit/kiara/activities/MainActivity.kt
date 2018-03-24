package com.gambit.kiara.activities

import android.app.SearchManager
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.SearchView
import android.util.Log
import android.view.Menu
import android.view.View
import com.gambit.kiara.R
import com.gambit.kiara.adapters.SubmissionListAdapter
import com.gambit.kiara.http.Response
import com.gambit.kiara.http.WebService
import com.gambit.kiara.models.Submission
import com.gambit.kiara.utils.PreferencesHelper
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback

/**
 * Created by itock on 3/24/2018.
 */
class MainActivity : AppCompatActivity() {

    companion object {
        fun start(context: Context) {
            context.startActivity(Intent(context, MainActivity::class.java))
        }
    }

    val submissionListAdapter = SubmissionListAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setSupportActionBar(toolbar)

        recyclerSubmissionList.layoutManager = LinearLayoutManager(this)
        recyclerSubmissionList.adapter = submissionListAdapter

        performGetSubmissionListByCustomerId(PreferencesHelper.userId!!)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)

        val search = menu?.findItem(R.id.action_search)
        val searchView = search?.actionView as SearchView?
        val searchManager = getSystemService(Context.SEARCH_SERVICE) as SearchManager

        searchView?.maxWidth = Int.MAX_VALUE
        searchView?.setOnSearchClickListener {
            supportActionBar?.setDisplayShowTitleEnabled(false)
        }
        searchView?.setOnCloseListener {
            supportActionBar?.setDisplayShowTitleEnabled(true)
            false
        }
        searchView?.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextChange(newText: String): Boolean = false

            override fun onQueryTextSubmit(query: String): Boolean {
                RumahListActivity.start(this@MainActivity, query)
                return true
            }
        })
        searchView?.setSearchableInfo(searchManager.getSearchableInfo(componentName))

        return super.onCreateOptionsMenu(menu)
    }

    private fun performGetSubmissionListByCustomerId(customerId: String) {
        progressLoading.visibility = View.VISIBLE

        WebService.services.getSubmissionListByCustomerId(customerId).enqueue(object : Callback<Response<List<Submission>>> {
            override fun onFailure(call: Call<Response<List<Submission>>>?, t: Throwable?) {
                progressLoading.visibility = View.GONE
                Log.e("@@@", t?.message)
            }

            override fun onResponse(call: Call<Response<List<Submission>>>?, response: retrofit2.Response<Response<List<Submission>>>?) {
                val submissionList = response?.body()?.data ?: listOf()

                submissionListAdapter.data.clear()
                submissionListAdapter.data.addAll(submissionList)
                submissionListAdapter.notifyDataSetChanged()

                progressLoading.visibility = View.GONE
            }
        })
    }
}