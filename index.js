var express = require("express")
var app = express()
var bodyParse = require("body-parser")
var cors = require("cors")
var db = require("./public/src/config/mongodbconnect")
var Customer = require("./public/src/model/entity")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")
var User = require("./public/src/model/Users")
app.get("/hello", function (req, res) {
    res.json("Hello anh dương")
})
//Kết nối với localhost
app.use(cors())
//Part dữ liệu từ client gửi về
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())
//Kết nối cơ sở dư liêu vào
db.connect();
//chèn dữ liệu vào database
app.post("/create", function (req, res) {
    var data = req.body
    var customer = new Customer(data)
    customer.save()
        .then(customer => {
            res.status(200)
                .json({ 'customer': 'Thêm dữ liệu thành công' })
        })
})
//Lấy dữ liệu từ server gửi về và hiển thị lên giao diện
app.get("/getList", function (req, res) {
    Customer.find({}, function (err, customer) {
        if (!err) {
            res.json(customer)
            console.log("Thêm thành công")
        }
        else {
            res.status(400)
                .json({ 'err': 'Lỗi lấy dữ liệu nhá bạn' })
        }
    })
})
//Cập nhật dũ liệu vào
app.get('/edit/:id', function (req, res) {
    var id = req.params.id
    Customer.findById(id, function (err, customer) {
        res.json(customer)
    })
})
app.post("/update/:id", function (req, res) {
    Customer.findById(req.params.id, function (err, customer) {
        if (!customer) {
            res.status(400).send("Lỗi gửi dữ liệu")
        }
        else {
            console.log(customer)
            customer.email = req.body.email;
            customer.first_name = req.body.first_name;
            customer.last_name = req.body.last_name;
            customer.save()
                .then(customer => {
                    res.json("Cập nhật thành công")
                })
                .catch(err => {
                    res.status(400).send("Lỗi cập nhật dữ liệu")
                })
        }
    })
})
//Xóa dữ liệu khỏi cơ sở dữ liệu
app.get("/delete/:id", function (req, res) {
    Customer.findByIdAndRemove({ _id: req.params.id, }, function (err, customer) {
        if (err) {
            res.status(400)
                .json(err)
        }
        else {
            res.json("Xóa thành công nhé bạn")
        }
    })
})
//Sử dụng login và register với jwt trong node with react js
app.post("/register", function (req, res) {
    var data = req.body
    var user = new User(data)
    user.save()
        .then(user => {
            res.json({ user: "Thêm thành công nhá" })
        })
        .catch(err => {
            res.json({ err: "Lỗi thêm rồi" })
        })
})
//Đăng nhập vào
app.post("/login", function (req, res) {
    User.findOne({
        emailaddres: req.body.emailaddres
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: "Lỗi tìm user" })

        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Lỗi mật khẩu' })
            } else {
                return res.json({ token: jwt.sign({ emailaddres: user.emailaddres, fullName: req.body.fullName, _id: req.body._id }, 'RESFULLAPIs') })

            }
        }
    })
})
//Kiểm tra tk đã login chưa
app.get('/')
app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split('')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split('')[1], 'RESFULLAPIs', function (err, code) {
            if (err) req.user = undefined
            req.user = code
            next();
        })
    } else {
        req.user = undefined
        next();
    }
})
var service = app.listen(8000, function (host, port) {
    var host = service.address().address
    var port = service.address().port
    console.log("Susscess nhé dương", host, port)
})