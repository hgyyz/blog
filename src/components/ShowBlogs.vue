<template>
    <div id='show-blogs'>
        <h1>博客总览</h1>
        <input type="text" placeholder="搜索" v-model="serch" class="serchBox">
        <!-- @click='sendSing(blog.title,blog.content,blog.categories,blog.author)' -->
        <div v-for="(blog,index) in filblogs" class="single-blog" :key="index">
            <router-link :to="'/blog/'+blog.id">
                <h2 v-rainbow>{{blog.title}}</h2>
            </router-link>
            
            <article>
                {{blog.content}}
            </article>
            <el-button type="danger" @click="deleteBlog(blog.id)">删除</el-button>
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
                this.blogs = data.body
            }
        })
            // console.log(JSON.parse(localStorage.getItem("todos")))
    },
    computed: {
        //搜索
        filblogs(){
            return this.blogs.filter((blog)=>{
                return blog.title.indexOf(this.serch) !== -1
            })
        },
    },
    mounted () {
   
    },
    methods: {  
        deleteBlog(id){
            this.submmited = true
            axios.post('/delete',{id:id})
            .then((data)=>{
                console.log(data.data.status)
                if(data.data.status == 0){
                    this.blogs = this.blogs.filter( blog => blog.id !== id )
                }else{
                    alert('只有管理员才能删除')
                }
            })
        },
    },
    watch:{
        blogs:{
            deep:true,
            handler(value){
                //深度监视，数据发生变化就往浏览器存一份，且将对象转为字符串
                localStorage.setItem('blogs',JSON.stringify(value))
            }
        }
    },
    beforeDestroy () {
        console.log('show被销毁了')
    }
}
</script>
<style scoped>
#show-blogs{
    max-width:800px;
    margin:0 auto;
}
article{
    max-width: 650px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap; 
}
.single-blog{
    padding:20px;
    margin:20px 0;
    box-sizing: border-box;
    background-color: #eee;
    position: relative;
}
.single-blog:hover ::v-deep .el-button{
    display: block;
}
.serchBox{
    width:780px;
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