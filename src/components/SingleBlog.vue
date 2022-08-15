<template>
    <div id='single-blog'>
        <h1>{{blog.title}}</h1>
        <div class="info">
            <div>分类：{{blog.categories}}</div>
            <div>作者：{{blog.author}}</div>
        </div>
        <article>{{blog.content}}</article>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SingleBlog',
    data () {
        return {
            id:this.$route.params.id,
            blog:{}
        }
    },
   mounted () {
        axios.post('/single',{id:this.id})
        .then((data)=>{
            console.log(this)
            this.blog=eval('('+JSON.stringify(data.data[0])+')')
            console.log(this.blog)
        })
   }
}
</script>

<style scoped>
h1{
    max-width: 1200px;
    text-align: center;
    margin:0 auto;
}
article{
    max-width: 1200px;
    margin:0 auto;
    font-size: 20px;
    text-indent: 2em;
}
.info{
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.info>div:nth-child(2){
    margin-left: 20px;
}
</style>