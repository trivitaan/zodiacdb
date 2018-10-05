var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
var mysql = require('mysql');


const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
  password : 'allnewvios?',
  database : 'toko'
});

db.connect();


app.post('/karyawan', (req, res)=>{

    var HariLahir = req.body.TanggalLahir.substr(0, 2)
    var BulanLahir = req.body.TanggalLahir.substr(3, 2)
    var TahunLahir = req.body.TanggalLahir.substr(6, 4)

    var zodiac = zodiac(HariLahir, BulanLahir)

    var date = new Date

    var tahun = date.getFullYear()

    function zodiac(hari, bulan) {

        var zodiacsign = {
            'aries': 'aries',
            'taurus': 'taurus',
            'gemini': 'gemini',
            'cancer': 'cancer',
            'leo': 'leo',
            'virgo': 'virgo',
            'libra': 'libra',
            'scorpio': 'scorpio',
            'sagitarius': 'sagitarius',
            'capricorn': 'capricorn',
            'aquarius': 'aquarius',
            'pisces': 'pisces'
        }
        if ((hari >= 21 && bulan == 3) || hari <= 19 && bulan == 4) {
            return zodiacsign.aries
        }
        else if ((hari >= 20 && bulan == 4) || hari <= 20 && bulan == 5) {
            return zodiacsign.taurus
        }
        else if ((hari >= 21 && bulan == 5) || hari <= 21 && bulan == 6) {
            return zodiacsign.gemini
        }
        else if ((hari >= 22 && bulan == 6) || hari <= 22 && bulan == 7) {
            return zodiacsign.cancer
        }
        else if ((hari >= 23 && bulan == 7) || hari <= 22 && bulan == 8) {
            return zodiacsign.leo
        }
        else if ((hari >= 23 && bulan == 8) || hari <= 22 && bulan == 9) {
            return zodiacsign.virgo
        }
        else if ((hari >= 23 && bulan == 9) || hari <= 22 && bulan == 10) {
            return zodiacsign.libra
        }
        else if ((hari >= 23 && bulan == 10) || hari <= 21 && bulan == 11) {
            return zodiacsign.scorpio
        }
        else if ((hari >= 22 && bulan == 11) || hari <= 21 && bulan == 12) {
            return zodiacsign.sagitarius
        }
        else if ((hari >= 22 && bulan == 12) || hari <= 19 && bulan == 1) {
            return zodiacsign.capricorn
        }
        else if ((hari >= 20 && bulan == 1) || hari <= 18 && bulan == 2) {
            return zodiacsign.aquarius
        }
        else if ((hari >= 19 && bulan == 2) || hari <= 20 && bulan == 3) {
            return zodiacsign.pisces
        }
    }

var data = {
    no: null,
    nama: req.body.nama,
    hari: HariLahir,
    bulan: BulanLahir,
    tahun: TahunLahir,
    zodiac: zodiac,
    usia: tahun - TahunLahir

}
var sql = 'insert into karyawan SET ?';
db.query(sql, data, (error, result) => {

    if (error) throw error;
    console.log(result)
    res.send({
        status: 'Data Berhasil diinput!',
    })
});
})

app.get('/karyawan', (req, res) => {
    var sql = 'select * from karyawan';
    db.query(sql, (error, result) => {

        if (error) throw error;
        console.log(result)
        res.send(result)
        
    });
})

app.listen(3210, ()=>{
    console.log('Server aktif @port 3210')
});