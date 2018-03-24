package com.gambit.kiara

import android.app.Application
import com.gambit.kiara.http.WebService
import com.gambit.kiara.utils.PreferencesHelper

/**
 * Created by itock on 3/24/2018.
 */
class Application : Application() {
    override fun onCreate() {
        super.onCreate()

        PreferencesHelper.init(this)

        WebService.init(this)
    }
}