<template>
    <div id='add-blog'>
        <h2>添加博客<span class="tip"></span></h2>
        <form v-if="!submmited">
            <label>博客标题</label>
            <input type="text" v-model='blog.title' required />
            <br>
            <label>博客内容</label>
            <textarea v-model='blog.content' wrap="hard"></textarea>
            <div id="checkboxes">
                <label>情感</label>
                <input type="radio" value="emotional"
                 v-model="blog.categories">
                <label>生活</label>
                <input type="radio" value="live"
                 v-model="blog.categories">
                <label>游戏</label>
                <input type="radio" value="game"
                 v-model="blog.categories">
                <label>健康</label>
                <input type="radio" value="health"
                 v-model="blog.categories">
            </div>
            <!-- <label>作者</label>
            <select v-model="blog.author">
                <option v-for="(author,index) in authors" :key="index">{{author}}</option>
            </select> -->
            <button @click.prevent="post()">添加博客</button>
        </form>
        <div v-if="submmited">
            <h3>您的博客发布{{tip==true ? '成功' : '失败'}}</h3>
        </div>
        <hr>
        <div id="preview">
            <h3>博客总览</h3>
            <p>博客标题:{{blog.title}}</p>
            <p>博客内容</p>
            <p>{{blog.content}}</p>
            <p>博客分类:</p>
            <ul>
                <li>{{blog.categories}}</li>
            </ul>
            <p>作者:{{blog.author}}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
    name: 'AddBlog',
    data () {
        return {
            blog:{
                title:"",
                content:"",
                categories:'',
                author:'' 
            },
            submmited:false,
            tip:true
        }
    },
    methods:{
        // https://jsonplaceholder.typicode.com/posts
        post(){
            this.submmited = true
            this.blog.content = this.blog.content.replace(/\n/g,'<br/>')
            console.log(this.blog.content)
            axios.post('/add',this.blog)
                .then((data)=>{
                    if(data.data.status==1){
                        this.tip = false
                        this.$message({
                        type: 'error',
                        message: '发布失败，均为必填项',
                        offset:80
                    });
                    }
                })
        },
    },
    mounted(){
        const {nickname} = JSON.parse(localStorage.getItem('user')) || {}
        console.log(nickname)
        this.blog.author = nickname
    }
}
</script>

<style scoped>
#add-blog{
    height: 85vh;
    overflow:scroll;
}
.tip{
    font-size: 14px;
    color:red;
}
</style>