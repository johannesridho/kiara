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
  newHouse.propinsi = (newHouse.id_propinsi == 31) ? 'dki jakarta' : 'dki jakarta'
  newHouse.kab_kota = (newHouse.id_kab_kota == 3174) ? 'jakarta selatan' : 'jakarta pusat'
  newHouse.kecamatan = (newHouse.id_kecamatan == 317408) ? 'pancoran' : 'sawah besar'
  newHouse.desa_kelurahan = (newHouse.id_desa_kelurahan == 3174081002) ? 'kalibata' : 'gunung sahari utara'
  return newHouse
}

HouseService.prototype.list = (keyword, isTest) => {
  return HouseRepo
    .list(keyword, isTest)
    .then((houses) => houses.map(HouseService.prototype.transform).slice(0, 10))
}

module.exports = new HouseService()