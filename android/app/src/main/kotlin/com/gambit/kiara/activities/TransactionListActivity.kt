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
import com.gambit.kiara.adapters.TransactionListAdapter
import com.gambit.kiara.http.Response
import com.gambit.kiara.http.WebService
import com.gambit.kiara.models.Transaction
import com.gambit.kiara.utils.PreferencesHelper
import kotlinx.android.synthetic.main.activity_transaction_list.*
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import java.text.NumberFormat
import java.util.*

/**
 * Created by itock on 3/25/2018.
 */
class TransactionListActivity : AppCompatActivity() {

    companion object {
        val EXTRA_HOUSE_ID = "extra_house_id"
        val EXTRA_HOUSE_NAME = "extra_house_name"
        val EXTRA_SUBMISSION_MONTHLY = "extra_submission_monthly"

        fun start(context: Context, houseId: Int, houseName: String, submissionMonthly: Double) {
            val intent = Intent(context, TransactionListActivity::class.java)
            intent.putExtra(EXTRA_HOUSE_ID, houseId)
            intent.putExtra(EXTRA_HOUSE_NAME, houseName)
            intent.putExtra(EXTRA_SUBMISSION_MONTHLY, submissionMonthly)
            context.startActivity(intent)
        }
    }

    private val transactionListAdapter = TransactionListAdapter()

    private var houseId: Int = -1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_transaction_list)

        houseId = intent.getIntExtra(EXTRA_HOUSE_ID, -1)

        val houseName = intent.getStringExtra(EXTRA_HOUSE_NAME)
        val submissionMonthly = intent.getDoubleExtra(EXTRA_SUBMISSION_MONTHLY, 0.0)

        setSupportActionBar(toolbar)
        supportActionBar?.title = houseName
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        recyclerTransactionList.layoutManager = LinearLayoutManager(this)
        recyclerTransactionList.adapter = transactionListAdapter

        buttonPay.isEnabled = false
        buttonPay.setOnClickListener { performCreateTransaction(PreferencesHelper.userId!!, houseId, submissionMonthly) }

        performGetTransactionListByCustomerId(PreferencesHelper.userId!!, houseId)
    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean =
            when (item?.itemId) {
                android.R.id.home -> {
                    NavUtils.navigateUpFromSameTask(this)
                    true
                }
                else -> super.onOptionsItemSelected(item)
            }

    private fun performGetTransactionListByCustomerId(customerId: String, houseId: Int) {
        progressLoading.visibility = View.VISIBLE
        buttonPay.isEnabled = false

        WebService.services.getTransactionListByCustomerId(customerId, houseId).enqueue(object : Callback<Response<List<Transaction>>> {
            override fun onFailure(call: Call<Response<List<Transaction>>>?, t: Throwable?) {
                progressLoading.visibility = View.GONE
                Log.e("@@@", t?.message)
            }

            override fun onResponse(call: Call<Response<List<Transaction>>>?, response: retrofit2.Response<Response<List<Transaction>>>?) {
                val transactionList = response?.body()?.data ?: listOf()

                if (transactionList.isNotEmpty()) {
                    textTotal.text = "Rp${NumberFormat.getNumberInstance(Locale("id")).format(transactionList[0].housePrice)},00"
                    textRemaining.text = "Rp${NumberFormat.getNumberInstance(Locale("id")).format(transactionList[0].remaining.toLong())},00"

                    buttonPay.isEnabled = transactionList[0].remaining > 0
                }

                transactionListAdapter.data.clear()
                transactionListAdapter.data.addAll(transactionList)
                transactionListAdapter.notifyDataSetChanged()

                progressLoading.visibility = View.GONE
            }
        })
    }

    private fun performCreateTransaction(customerId: String, houseId: Int, amount: Double) {
        WebService.services.createTransaction(customerId, houseId, amount).enqueue(object : Callback<ResponseBody> {
            override fun onFailure(call: Call<ResponseBody>?, t: Throwable?) {
                Log.e("@@@", t?.message)
            }

            override fun onResponse(call: Call<ResponseBody>?, response: retrofit2.Response<ResponseBody>?) {
                textTotal.text = null
                textRemaining.text = null
                transactionListAdapter.data.clear()
                transactionListAdapter.notifyDataSetChanged()

                performGetTransactionListByCustomerId(customerId, houseId)
            }
        })
    }
}