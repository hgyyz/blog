const multer  = require('multer')
const path = require('path')
var filename = ''
let tools = {
    multer(){
        const storage = multer.diskStorage({
            //配置上传的目录
            destination: function (req, file, cb) {
              cb(null, path.join(__dirname,'../','public/upload'))
            },
            //修改上传后的文件名
            filename: function (req, file, cb) {
                //获取后缀名
                let exname = path.extname(file.originalname)
                
                //根据时间戳生成文件名
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              cb(null, file.fieldname + '-' + uniqueSuffix + exname)
                filename = '/upload/'+file.fieldname + '-' + uniqueSuffix + exname
             
            }
          })
          
        const upload = multer({ storage: storage })
        
        return upload
    },
    filename(){
      //如果没有上传新的图片，再次得到filename的值则为空
      return filename
    }
}

module.exports = tools

