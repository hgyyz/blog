<template>
    <nav>
        <ul>
            <li class="left">
                <el-upload class="avatar-uploader head-pic" :action="'/uploadhead/'+id" name="fileList"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <a v-if="nickShow" @click="open" class="login-btn">{{ nickname == null ? '修改昵称' : nickname }}</a>
            </li>
            <li class="right">
                <router-link to="/" exact active-class="fou">主页</router-link>
                <router-link to="/add" exact active-class="fou">写博客</router-link>
                <span @click="logout" exact active-class="fou">注销</span>
            </li>
        </ul>
    </nav>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'BlogHeader',
        data() {
            return {
                nickname: '请登录',
                dialogVisible: false,
                imageUrl: '/headPic.png',
                id: 0,
                nickShow:false
            }
        },
        methods: {
            //注销
            logout() {
                this.nickname = ''
                this.imageUrl = ''
                localStorage.clear('user')
                this.$cookie.delete('cookie')
                this.$router.push('/login')
            },
            //获取头像地址
            getHead(id) {
                axios.post('/gethead', {
                    id: id
                }).then((data) => {
                    const {
                        headPic,
                        nickname
                    } = data.data
                    this.imageUrl = headPic
                    this.nickname = nickname
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    }).catch(_ => {});
            },
            //修改昵称对话框
            open() {
                this.$prompt('请输入昵称', '修改昵称', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[\u4e00-\u9fa5]{2,4}$/,
                    inputErrorMessage: '昵称格式不正确'
                }).then(({
                    value
                }) => {
                    if (localStorage.getItem('user')) {
                        //发送给服务器修改昵称
                        axios.post('/nickname', {
                            nickname: value,
                            id: this.id
                        }).then((data) => {
                            if (data.data.status == 0) {
                                this.nickname = data.data.nickname
                                let n = JSON.parse(localStorage.getItem('user'))
                                n.nickname = data.data.nickname
                                localStorage.setItem('user', JSON.stringify(n))
                                this.$message({
                                    type: 'success',
                                    message: '你好 ' + value,
                                    offset:80
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '修改失败',
                                    offset:80
                                });
                            }
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请登录',
                            offset:80
                        });
                    }


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入',
                        offset:80
                    });
                });
            },
            //头像页面上的修改
            handleAvatarSuccess(res, file) {
                if (localStorage.getItem('user')) {
                    let u = JSON.parse(localStorage.getItem('user'))
                    u.headPic = res.headPic
                    localStorage.setItem('user', JSON.stringify(u))
                    this.imageUrl = res.headPic
                } else {
                    this.$message({
                        type: 'error',
                        message: '请登录',
                        offset:80
                    });
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        mounted() {
            //获取本地数据
            const {headPic,nickname} = JSON.parse(localStorage.getItem('user')) || {}
            this.imageUrl = headPic
            this.nickname = nickname
            this.nickShow = true
            //登录时改变导航栏的头像和昵称(解决组件不刷新，数据变了页面不变)
            this.$bus.$on('info', (data) => {
                this.id = data.id
                this.getHead(this.id)
                this.nickShow = true
            })
        }
    }
</script>

<style scoped>
    nav {
        position: fixed;
        width: 100%;
        top: 0px;
        z-index: 10;
    }

    ul {
        list-style-type: none;
        text-align: center;
        margin: 0;
        display: flex;
        padding: 0px;
        height: 50px;
        background-color: rgb(42, 41, 41, 0.4);
    }

    a,
    span {
        color: #fff;
        text-decoration: none;
        padding: 12px;
        border-radius: 5px;
        cursor: pointer;
    }

    .router-link-active {
        background: white;
        color: #444;
    }

    .left {
        width: 40%;
        display: flex;
        align-items: center;
        margin-left: 8px;
    }

    ::v-deep .avatar,
    .avatar-uploader,
    .el-icon-plus,
    .el-upload--text {
        width: 35px !important;
        height: 35px !important;
        border-radius: 50% !important;
        line-height: 35px !important;
    }

    ::v-deep .el-upload {
        height: 35px !important;
    }

    ::v-deep .el-icon-plus::before {
        padding-top: -20px !important;
    }

    .login-btn {
        display: inline-block;
        margin-left: 8px;
        cursor: pointer;
    }

    .right {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }


    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>