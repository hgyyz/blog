<template>
    <div id='id'>
        <BlogHeader></BlogHeader>

        <!-- 是否重新挂载 -->
        <!-- <keep-alive :include="['Login','ShowBlogs']"> -->
            <router-view></router-view> 
        <!-- </keep-alive>  -->
        
    </div>
</template>

<script>
    import BlogHeader from './components/BlogHeader.vue'
    export default {
    name: 'app',
    data () {
        return {
        }
    },
    components: {
        BlogHeader,
    },
}
</script>

<style>
body{
    background-color: #D3B0A2;
    background-size: 220vh 110vh;
    /* background-image: url('../public/back.jpg'); */
    background-repeat:no-repeat;
    font-family: "Times New Roman", Times, serif;
    margin: 0;
    padding: 0;
}   
#add-blog *{
    box-sizing: border-box;
}

#add-blog{
    margin: 20px auto;
    max-width:600px;
    padding:20px;
}
label{
    display: block;
    margin:20px 0 10px;
}
input[type="text"],textarea,select{
    display: block;
    width: 100%;
    padding:8px;
}
textarea{
    height:200px;
}
#checkboxes label{
    display: inline-block;
    margin-top: 0px;
}
#checkboxes input{
    display: inline-block;
    margin-top: 10px;
}
button{
    display: block;
    margin: 20px 0;
    background-color: crimson;
    color: #fff;
    border: 0;
    padding: 14px;
    border-radius: 4px;
    font-size:18px;
    cursor:pointer;
}
#preview{
    padding:10px 20px;
    border:1px dotted #ccc;
    margin:30px 0;
}
h3{
    margin-top: 10px;
}
::-webkit-scrollbar{
    display: none;
}
</style>