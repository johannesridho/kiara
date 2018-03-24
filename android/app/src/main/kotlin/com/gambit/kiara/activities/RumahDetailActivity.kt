package com.gambit.kiara.activities

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.ActivityOptionsCompat
import android.support.v4.app.NavUtils
import android.support.v4.util.Pair
import android.support.v7.app.AppCompatActivity
import android.view.MenuItem
import android.view.View
import com.gambit.kiara.R
import com.gambit.kiara.adapters.GambarPagerAdapter
import com.gambit.kiara.adapters.RumahListAdapter
import com.gambit.kiara.models.Rumah
import kotlinx.android.synthetic.main.activity_rumah_detail.*
import java.text.NumberFormat
import java.util.*

/**
 * Created by itock on 3/24/2018.
 */
class RumahDetailActivity : AppCompatActivity() {

    companion object {
        val EXTRA_RUMAH_ID = "extra_rumah_id"

        fun start(context: Context, transitionViewRoot: View, rumahId: Int) {
            val intent = Intent(context, RumahDetailActivity::class.java)
            intent.putExtra(EXTRA_RUMAH_ID, rumahId)

            val gambarPair = Pair.create(transitionViewRoot.findViewById(R.id.imageGambar) as View, "gambar")
            val namaPair = Pair.create(transitionViewRoot.findViewById(R.id.textNama) as View, "nama")
            val options = ActivityOptionsCompat.makeSceneTransitionAnimation(context as Activity, gambarPair, namaPair)

            context.startActivity(intent, options.toBundle())
        }
    }

    var rumah: Rumah? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rumah_detail)

        val rumahId = intent.getIntExtra(EXTRA_RUMAH_ID, -1)
        rumah = RumahListAdapter.data.find { it.id == rumahId }

        setSupportActionBar(toolbar)
        supportActionBar?.title = rumah?.nama
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        viewPagerGambar.adapter = GambarPagerAdapter(rumah?.gambar ?: listOf())

        textNama.text = rumah?.nama
        textAlamat.text = rumah?.alamat
        textCluster.text = rumah?.cluster
        textBlok.text = rumah?.blok
        textNomor.text = rumah?.nomor
        textKelurahan.text = rumah?.kelDesa
        textKecamatan.text = rumah?.kecamatan
        textKota.text = rumah?.kabKota
        textPropinsi.text = rumah?.propinsi
        textKodePos.text = "${rumah?.kodePos}"
        textDeskripsi.text = rumah?.deskripsi
        textLuasTanah.text = "${rumah?.luasTanah}"
        textLuasBangunan.text = "${rumah?.luasBangunan}"
        textLantai.text = "${rumah?.lantai}"
        textKamarTidur.text = "${rumah?.kamarTidur}"
        textKamarMandi.text = "${rumah?.kamarMandi}"
        textGarasi.text = "${rumah?.garasi}"
        textTahun.text = "${rumah?.tahunPembangunan}"
        textSertifikat.text = rumah?.sertifikat
        textDaya.text = rumah?.dayaListrik
        textPdam.text = if (rumah?.jalurPdam!!) "Ada" else "Tidak ada"
        textTelp.text = if (rumah?.jalurTelp!!) "Ada" else "Tidak ada"
        textSubsidi.text = if (rumah?.subsidi!!) "Ya" else "Tidak"
        textHarga.text = "Rp${NumberFormat.getNumberInstance(Locale("id")).format(rumah?.harga)},00"
    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean =
            when (item?.itemId) {
                android.R.id.home -> {
                    NavUtils.navigateUpFromSameTask(this)
                    true
                }
                else -> super.onOptionsItemSelected(item)
            }
}