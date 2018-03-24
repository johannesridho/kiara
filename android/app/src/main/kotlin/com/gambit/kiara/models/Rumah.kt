package com.gambit.kiara.models

import com.google.gson.annotations.SerializedName

/**
 * Created by itock on 3/24/2018.
 */
class Rumah {

    @SerializedName("id_stk_kavling")
    var id: Int = -1

    var nama: String? = null

    var harga: Long = 0

    @SerializedName("images")
    var gambar: List<String> = listOf()

    var deskripsi: String? = null

    var subsidi: Boolean = false

    var luasTanah: Int = 0

    var luasBangunan: Int = 0

    @SerializedName("tahun_bangun")
    var tahunPembangunan: Int = 0

    var lantai: String? = null

    var jalurPdam: Boolean = false

    var jalurTelp: Boolean = false

    var dayaListrik: String? = null

    var kamarTidur: Int = 0

    var kamarMandi: Int = 0

    var garasi: Int = 0

    var sertifikat: String? = null

    var alamat: String? = null

    @SerializedName("klaster")
    var cluster: String? = null

    var blok: String? = null

    @SerializedName("no")
    var nomor: String? = null

    @SerializedName("kodepos")
    var kodePos: Int? = null

    var propinsi: String? = null

    var kabKota: String? = null

    var kecamatan: String? = null

    @SerializedName("desa_kelurahan")
    var kelDesa: String? = null

    var latitude: Double? = null

    var longitude: Double? = null

    @SerializedName("jml_dilihat")
    var jumlahDilihat: Int? = null
}