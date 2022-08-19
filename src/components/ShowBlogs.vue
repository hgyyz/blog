<template>
    
    <div id='show-blogs'>
        
        <input type="text" placeholder="搜索" v-model="serch" class="serchBox">
        <div class="wrapper">
            <div v-for="(blog,index) in filblogs" class="single-blog" :key="index">
                <router-link :to="'/blog/'+blog.id">
                    <h2>{{blog.title}}</h2>
                </router-link>
                
                <article v-html="blog.content">
                    
                </article>
                <el-button type="danger" @click="deleteBlog(blog.id)">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ShowBlogs',
    data () {
        return {
            blogs:[],
            serch:'',
            arr:[],
        }
    },
    created(){
        this.$http.post("/show")
        .then(function(data){
            if(data.body.status==1){
                this.$router.push('/PleaseLogin')
            }else{ 
                this.blogs = data.body.blogs
            }
        })
    },
    computed: {
        //搜索
        filblogs(){
            return this.blogs.filter((blog)=>{
                return blog.title.indexOf(this.serch) !== -1
            })
        },
    },
    methods: {  
        deleteBlog(id){
            this.submmited = true
            axios.post('/delete',{id:id,username:JSON.parse(localStorage.getItem('user')).username})
            .then((data)=>{
                console.log(data.data.status)
                if(data.data.status == 0){
                    this.blogs = this.blogs.filter( blog => blog.id !== id )
                }else{
                    this.$message({
                        type: 'error',
                        message: '只有管理员才能删除'
                    });
                }
            })
        },
    },
    // watch:{
    //     blogs:{
    //         deep:true,
    //         handler(value){
    //             //深度监视，数据发生变化就往浏览器存一份，且将对象转为字符串
    //             localStorage.setItem('blogs',JSON.stringify(value))
    //         }
    //     }
    // },
}
</script>
<style scoped>
#show-blogs{
    max-width:800px;
    height: 100%;
    margin:0 auto;
    padding-top: 50px;
}
.wrapper{
    max-width:780px;
    margin:0 auto;
    height: 85vh;
    overflow-y: scroll;
}
article{
    max-width: 650px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap; 
    height: 20px;
}
.single-blog{
    padding:20px;
    margin:20px 0;
    box-sizing: border-box;
    background-color:rgba(255, 255, 255, 0.5);
    position: relative;
}
.single-blog:hover ::v-deep .el-button{
    display: block;
}
.serchBox{
    box-sizing: border-box;
    max-width:780px;
    margin: 0 auto;
}
a{
    text-decoration: none;
}
::v-deep .el-button{
    position: absolute;
    right: 40px;
    top: 50%;
    margin-top: -20px;
    display: none;
}
</style>