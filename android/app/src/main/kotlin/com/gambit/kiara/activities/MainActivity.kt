package com.gambit.kiara.activities

import android.app.SearchManager
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.SearchView
import android.view.Menu
import com.gambit.kiara.R
import kotlinx.android.synthetic.main.activity_main.*

/**
 * Created by itock on 3/24/2018.
 */
class MainActivity : AppCompatActivity() {

    companion object {
        fun start(context: Context) {
            context.startActivity(Intent(context, MainActivity::class.java))
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setSupportActionBar(toolbar)
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
}