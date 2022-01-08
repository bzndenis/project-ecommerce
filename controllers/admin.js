var express = require('express');
var async = require('async-validator');
var router = express.Router();
var admin = require.main.require('./models/admin-model');
var loginValidation = require.main.require('./validation/loginAdmin');
var authOn = require('../config/alreadyOn');
var authAdmin = require('../config/isAdmin');
var product = require.main.require('./models/product-model');
var rupiah = require('rupiah-format');


router.get('/', authAdmin,function(req,res){
    res.render('../views/admin/index')
});

router.get('/login', authOn, function(req,res){
    res.render('../views/admin/login');
});

router.get('/logout', authAdmin, function(req,res){
    req.session.destroy(function(){
  });
    res.redirect('/index');
});

router.post('/login', function(req,res){
    var data = {
        username: req.body.username,
        password: req.body.password
    };

    var validator = new async(loginValidation.login);
    validator.validate(data, function(errors){
        if(errors) {
            res.render('admin/login', {errors: errors});
        } else {
            admin.adminLogin(data, function(result){
                if(result) {
                    req.session.loggedAdmin = data.username;
                    res.redirect('/admin');
                } else {
                    res.render('../views/admin/login', {errorMessageAdmin:'Email atau Password salah'});
                }
            });
        }
    });
});

router.all('/listuser', authAdmin, function(req,res) {
    admin.userList(function(result){
        if(result && result!=null) {
            res.render('../views/admin/listuser',{result: result});
        } else {
            res.render('');
        }
    });
});

router.get('/listallproducts', authAdmin, function(req,res) {
    product.productList(function(result) {
        if(result && result!=null) {
            res.render('../views/admin/listallproduct',{result: result, rupiah: rupiah});
        } else {
            res.render('');
        }
    });
});

router.post('/listallproducts', authAdmin, function(req,res) {
    var data = {
        nama_product: req.body.nama_product,
        foto: req.body.foto,
        harga: req.body.harga,
        kategori: req.body.kategori,
        keterangan: req.body.keterangan
    };
    admin.tambahProduct(data, function(valid) {
        if(valid) {
            res.redirect('/admin/listallproducts');
        } else {
            res.render('');
        }
    });
});

router.get('/listtanaman', authAdmin, function(req,res) {
    product.productTanaman(function(result) {
        if(result && result!=null) {
            res.render('../views/admin/listproductcat',{result: result, rupiah: rupiah});
        } else {
            res.render('');
        }
    });
});

router.post('/listtanaman', authAdmin, function(req,res) {
    var data = {
        nama_product: req.body.nama_product,
        foto: req.body.foto,
        harga: req.body.harga,
        kategori: req.body.kategori,
        keterangan: req.body.keterangan
    };
    admin.tambahProduct(data, function(valid) {
        if(valid) {
            res.redirect('/admin/listtanaman');
        } else {
            res.render('');
        }
    });
});

router.get('/listbibit', authAdmin, function(req,res) {
    product.productBibit(function(result) {
        if(result && result!=null) {
            res.render('../views/admin/listproductcat',{result: result, rupiah: rupiah});
        } else {
            res.render('');
        }
    });
});

router.post('/listbibit', authAdmin, function(req,res) {
    var data = {
        nama_product: req.body.nama_product,
        foto: req.body.foto,
        harga: req.body.harga,
        kategori: req.body.kategori,
        keterangan: req.body.keterangan
    };
    admin.tambahProduct(data, function(valid) {
        if(valid) {
            res.redirect('/admin/listbibit');
        } else {
            res.render('');
        }
    });
});

router.get('/konfirmasi', authAdmin,function(req,res) {
    admin.orderListByKonfirmasi(function(result) {
        if(result && result!=null) {
            res.render('../views/admin/orderkonfirmasi',{result: result, rupiah: rupiah});
        } else {
            res.render('');
        }
    });
});

router.get('/diproses', authAdmin,function(req,res) {
    admin.orderListByProses(function(result) {
        if(result && result!=null) {
            res.render('../views/admin/orderproses',{result: result, rupiah: rupiah});
        } else {
            res.render('');
        }
    });
});

router.get('/dikirim', authAdmin,function(req,res) {
    admin.orderListByKirim(function(result) {
        if(result && result!=null) {
            res.render('../views/admin/orderkirim',{result: result, rupiah: rupiah});
        } else {
            res.render('');
        }
    });
});

router.get('/diterima', authAdmin,function(req,res) {
    admin.orderListByTerima(function(result) {
        if(result && result!=null) {
            res.render('../views/admin/orderterima',{result: result, rupiah: rupiah});
        } else {
            res.render('');
        }
    });
});





module.exports = router;