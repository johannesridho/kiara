const Promise = require('bluebird')
const axios = require('axios')
const CONFIG = require('../config')
const LOGGER = require('../utils/logger.js')

var HouseRepo = function () {

  this.items = [
    {
      "id_stk_kavling": 167,
      "id_stk_dev": 0,
      "id_stk_proyek": 1274007,
      "id_tipe_rumah": 0,
      "nama": "2BR",
      "harga": 1846547512,
      "jenis": 3,
      "gbr1": "https://www.btnproperti.co.id/cdn1/images/tipe-rumah/20170531/medium/395151f9-75cc-4eb0-8b8e-9061e708e1fd.jpeg",
      "gbr2": "https://www.btnproperti.co.id/cdn1/images/tipe-rumah/20170531/medium/3e919f08-998c-49f9-98de-9287bea07299.jpeg",
      "gbr3": "https://www.btnproperti.co.id/cdn1/images/tipe-rumah/20170531/medium/c0f30a08-0fc1-4762-a3d4-50010a0c8558.jpeg",
      "gbr4": "https://www.btnproperti.co.id/cdn1/images/tipe-rumah/20170531/medium/2d4816bf-2215-409a-a395-53c243b3fe5f.jpeg",
      "gbr5": "https://www.btnproperti.co.id/cdn1/images/tipe-rumah/20170531/medium/9c63704d-c497-4c44-aeea-853cb9e21f7f.jpeg",
      "deskripsi": "Dokumen : Sertifikat Hak Milik atas Satuan Rumah Susun (SHMSRS)\nFasilitas :Parking Lot, Sky Lounge, Tree Pit, Fitness Centre, ATM Gallery, Minimarket, Triple Play, (TV Cable, Telephone, Internet) 24 Hours Security, Acces Card Security System.\nFasilitas ",
      "subsidi": false,
      "luas_tanah": 50,
      "luas_bangunan": 50,
      "tahun_bangun": 2015,
      "lantai": "15",
      "jalur_pdam": true,
      "jalur_telp": true,
      "daya_listrik": "1.300",
      "kamar_tidur": 2,
      "kamar_mandi": true,
      "garasi": true,
      "sertifikat": "SHM",
      "alamat": "JL. KALIBATA RAYA NO. 22",
      "klaster": "MAHAGONY (TOWER 4)",
      "blok": "LT 15",
      "no": "16",
      "kodepos": 12740,
      "id_propinsi": 31,
      "id_kab_kota": 3174,
      "id_kecamatan": 317408,
      "id_desa_kelurahan": 3174081002,
      "latitude": "-6.255838003628121",
      "longitude": "106.85620608771058",
      "status_unit": 2,
      "status_jual": 2,
      "status_pengajuan": 4,
      "id_booking": "",
      "jml_dilihat": 0,
      "keyword": "kav17053110494226693, 2br, pt. pardika wisthi sarana, woodland park residence apartemen, 2br, dki jakarta, kota adm. jakarta selatan, pancoran, kalibata",
      "tgl_insert": null,
      "jenis_lama": "",
      "subsidi_lama": "",
      "jalur_pdam_lama": "",
      "jalur_telepon_lama": "",
      "status_unit_lama": "",
      "status_pengajuan_lama": "",
      "video": "",
      "tgl_update_status": null,
      "last_update": null,
      "status_eloan": true,
      "respon_eloan": "Accept",
      "tgl_kirim_eloan": null,
      "kategori_agunan": "",
      "jenis_lelang": false,
      "created_at": null,
      "updated_at": null
    }
  ]

  this.get = (houseId, isTest) => {
    if (isTest) {
      return new Promise((resolve, reject) => {
        const items = this.items.filter((item) => item.id_stk_kavling == houseId)
        const result = (items.length > 0) ? items[0] : {}
        resolve(result)
      })
    } else {
      return axios({
          url: CONFIG.btn.host + '/house-list',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'apikey': CONFIG.btn.apikey
          },
          data: {
            keyword: 'jakarta'
          }
        })
        .then((response) => response.data.payload.filter((item) => {
          return item.id_stk_kavling == houseId
        }))
        .then((items) => {
          const result = (items.length > 0) ? items[0] : {}
          return result
        })
        .catch((error) => {
          error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
          return []
        })
    }
  }

  this.list = (keyword, isTest) => {
    if (isTest) {
      return new Promise((resolve, reject) => resolve(this.items))
    } else {
      return axios({
          url: CONFIG.btn.host + '/house-list',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'apikey': CONFIG.btn.apikey
          },
          data: {
            keyword: 'jakarta'
          }
        })
        .then((response) => response.data.payload)
        .catch((error) => {
          error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
          return []
        })
    }
  }
}

module.exports = new HouseRepo()