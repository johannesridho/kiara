package com.gambit.kiara.activities

import android.os.Bundle
import android.os.Handler
import android.support.v7.app.AppCompatActivity
import com.gambit.kiara.R

/**
 * Created by itock on 3/24/2018.
 */
class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        Handler().postDelayed({
            finish()
            LoginActivity.start(this)
        }, 1000)
    }
}