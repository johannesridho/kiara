const Promise = require('bluebird')
const CONFIG = require('../config')
const HouseRepo = require('../repositories/HouseRepo.js')

var HouseService = function () {}

HouseService.prototype.transform = (house) => {
  let newHouse = JSON.parse(JSON.stringify(house))
  newHouse.images = [
    newHouse.gbr1,
    newHouse.gbr2,
    newHouse.gbr3,
    newHouse.gbr4,
    newHouse.gbr5,
  ]
  newHouse.propinsi = (newHouse.id_propinsi == 31) ? 'DKI Jakarta' : 'DKI Jakarta'
  newHouse.kab_kota = (newHouse.id_kab_kota == 3174) ? 'Jakarta selatan' : 'Jakarta pusat'
  newHouse.kecamatan = (newHouse.id_kecamatan == 317408) ? 'Pancoran' : 'Sawah Besar'
  newHouse.desa_kelurahan = (newHouse.id_desa_kelurahan == 3174081002) ? 'Kalibata' : 'Gunung Sahari Utara'
  delete newHouse.gbr1
  delete newHouse.gbr2
  delete newHouse.gbr3
  delete newHouse.gbr4
  delete newHouse.gbr5
  delete newHouse.id_propinsi
  delete newHouse.id_kab_kota
  delete newHouse.id_kecamatan
  delete newHouse.id_desa_kelurahan
  delete newHouse.keyword
  delete newHouse.tgl_insert
  delete newHouse.jenis_lama
  delete newHouse.subsidi_lama
  delete newHouse.jalur_pdam_lama
  delete newHouse.jalur_telepon_lama
  delete newHouse.status_unit_lama
  delete newHouse.status_pengajuan_lama
  delete newHouse.video
  delete newHouse.tgl_update_status
  delete newHouse.last_update
  delete newHouse.status_eloan
  delete newHouse.respon_eloan
  delete newHouse.tgl_kirim_eloan
  delete newHouse.kategori_agunan
  delete newHouse.jenis_lelang
  delete newHouse.created_at
  delete newHouse.updated_at
  return newHouse
}

HouseService.prototype.list = (keyword, isTest) => {
  return HouseRepo
    .list(keyword, isTest)
    .then((houses) => houses.map(HouseService.prototype.transform).slice(0, 10))
}

module.exports = new HouseService()