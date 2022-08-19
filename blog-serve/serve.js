const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
//可解决session跨域
app.use(express.json())
app.use(cors()) 
app.set('trust proxy', 1) 
const db = require('./db/index')
app.use(express.static(__dirname+'/public'))
//导入 bcryptjs 包
const bcrypt = require('bcryptjs')
const session = require('express-session')
const tools = require('./model/tools')
app.set('trust proxy', 1) 
app.use(express.urlencoded({ extended:false }))

// const secretKey = 'youyouzi'

// app.use(expressJWT({secret:secretKey,algorithms:['HS256']}).unless({path:[/\/login/,/\/register/]}))
//封装发送给客户端的信息res.cc
app.use((req,res,next)=>{
    res.cc = function(err,status=1){
        //status 默认值为1，表示失败的情况
        //err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
        res.send({
            status,
            message:err instanceof Error ? err.message : err,
        })
    }
    next()
})

app.use(session({
    secret: 'keyboard cat',//服务端生成 session 的签名
    resave: false,//强制保存 session 即使它没有变化
    saveUninitialized: true,//强制将未初始化的 session 存储
    cookie: { 
        maxAge:1000*60*60,
        secure: false //true 表示只有 https 协议才能访问cookie
      }
  }))
app.post('/login',(req,res)=>{
    const userinfo = req.body.user
    console.log(userinfo)
    //定义SQL语句
    const sql = 'select * from users where username=?'
    
    //执行SQL语句，根据用户名查询用户的信息
    db.query(sql,userinfo.username,(err,results)=>{
        //执行SQL语句失败
        if(err) return res.cc(err)
        //执行SQL语句成功，但是获取到的数据条数不等于1
        if(results.length !== 1) return res.cc('登录失败')
        //判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.pass,results[0].password)
        if(!compareResult) return res.cc('登录失败！')
        //在服务器生成session的字符串
        const user = {...results[0],password:''}
        console.log(user.username)
        req.session.user = user
        // const tokenStr = jwt.sign({username:userinfo.username},secretKey,{expiresIn:'30s'})
        // console.log(tokenStr)
        return res.send({
            status:0,
            message:'登录成功',
            session:req.session.user,
            // token:tokenStr
        })
    })
})
//添加博客接口
app.post('/add',(req,res)=>{
        const blogs = eval("("+JSON.stringify(req.body)+")");
        const sql = 'insert into blog set ?'
        const {title,content,categories,author} = blogs
        if(title != '' && content != '' && categories != '' && author != ''){
            db.query(sql,{title,content,categories,author},function(err,results){
                if(err) console.log(err)
                res.send({
                    status:0,
                    message:'添加博客成功'
                })
            })
        }else{
            res.send({
                status:1,
                message:'均为必填项'
            })
        }
        
})
//展示博客接口
app.post('/show',(req,res)=>{
        const sql = 'select * from blog'
        db.query(sql,(err,results)=>{
            const blogs = eval("("+JSON.stringify(results)+")");
            res.send({
                blogs:blogs,
                status:0
            })
        })
})
//删除博客接口
app.post('/delete',(req,res)=>{
        const blogs = eval("("+JSON.stringify(req.body)+")");
        if(blogs.username == 'admin'){
            const sql = 'delete from blog where id = ?'
            db.query(sql,blogs.id,(err,results)=>{
                if(err) console.log(err)
                res.cc('删除成功',0)
                console.log('删除博客成功')
            })
        }else{
            res.cc('删除博客失败')
        }
        
})
//展示单个博客接口
app.post('/single',(req,res)=>{
    const blogs = eval("("+JSON.stringify(req.body)+")");
    const sql = 'select * from blog where id = ?'
    db.query(sql,blogs.id,(err,results)=>{
        if(err) console.log(err)
        res.send(results)
    })
})
//注册接口
app.post('/register',(req,res)=>{
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body.users

    //验证提交过来的表单数据
    const patt = /^[a-zA-Z0-9_-]{4,16}$/
    if(!patt.test(userinfo.username)) return res.cc('用户名错误')
    const ePattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    if(!ePattern.test(userinfo.email)) return res.cc('邮箱格式错误')
    const mPattern = /^1[3456789]\d{9}$/;
    if(!mPattern.test(userinfo.phone)) return res.cc('手机格式错误')
    if(userinfo.pass!==userinfo.checkPass) return res.cc('两次密码不一致')
    
    //定义SQL语句，查询用户名是否被占用
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        //执行SQL语句失败
        if(err){
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if(results.length > 0){
            return res.cc('用户名被占用')
        }
        const sqlStr = 'select * from users where phone=?'
        db.query(sqlStr,userinfo.phone,(err,results)=>{
            //执行SQL语句失败
            if(err){
                return res.cc(err)
            }
            // 判断手机号是否被占用
            if(results.length > 0){
                return res.cc('手机号被占用')
            }

            //调用 bcrypt.hashSync() 对密码进行加密
            userinfo.pass = bcrypt.hashSync(userinfo.pass,5)

            //定义插入用户的SQL语句
            const sql = 'insert into users set ?'
            
            //调用db.query()执行SQL语句，插入新用户
            db.query(sql,{username:userinfo.username,password:userinfo.pass,email:userinfo.email,phone:userinfo.phone},function(err,results){
                //执行SQL语句失败
                if(err) return res.cc('ee'+err)
                //SQL 语句执行成功，但影响行数不为1
                if(results.affectedRows !== 1){
                    return res.cc('注册用户失败，请稍后再试！')
                }
                //注册成功
                res.cc('注册成功',0)
            })
        })  
    }) 
})
//昵称接口
app.post('/nickname',(req,res)=>{
    const {nickname,id} = req.body
    console.log(nickname,id)
    const sql = `update users set nickname = '${nickname}' where id = ${id} `
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }else{
            res.send({
                status:0,
                message:'修改昵称成功',
                nickname:nickname
            })
        }
        
    })
})
//头像接口
app.post("/uploadhead/:id",tools.multer().single('fileList'),(req, res) => {
    const filename = tools.filename()
    const {params:{id}} = req
    const sql = `update users set headPic = '${filename}' where id = ${id}`
    db.query(sql,(err,results)=>{
        if(!err){
            res.send({
                status:0,
                message:'图片上传成功',
                headPic:filename
            })
        }else{
            console.log(err)
        }
    })
    
})
//头像和昵称接口
app.post("/gethead",(req, res) => {
    const {id} = req.body
    const sql = `select headPic,nickname from users where id = ${id}`
    db.query(sql,(err,results)=>{
        try {
            if(!err){
                res.send({
                    status:0,
                    headPic:results[0].headPic,
                    nickname:results[0].nickname
                })
            }
        } catch (error) {
            res.send({
                status:1,
                headPic:'',
                nickname:'请登录'
            })
        }
    })
    
})
app.listen(5005,(err)=>{
    if(!err) console.log('服务器启动成功了')
})