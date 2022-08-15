<template>
    <nav>
        <ul>
            <li>
                <router-link to="/login" exact active-class="fou">登录</router-link>
                <router-link to="/register" exact active-class="fou">注册</router-link>
                <router-link to="/" exact active-class="fou">博客</router-link>
                <router-link to="/add" exact active-class="fou">写博客</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'BlogHeader'
}
</script>

<style scoped>
.fou{
    background-color: #001DB1;
}
ul{
    list-style-type: none;
    text-align:center;
    margin:0;
}
li{
    display: inline-block;
    margin:0 10px;
}
a{
    color:#fff;
    text-decoration: none;
    padding:12px;
    border-radius: 5px;
}
nav{
    background: #FFA446;
    padding:30px 0;
    margin-bottom: 40px;

}
.router-link-active{
    background:white;
    color:#444;
}
</style>