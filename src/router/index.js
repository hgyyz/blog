// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
import Vue from 'vue'

//引入组件
import AddBlog from '../components/AddBlog'
import ShowBlog from '../components/ShowBlogs'
import SingleBlog from '../components/SingleBlog'
import Login from '../components/Login'
import Register from '../components/Register'
import PleaseLogin from '../components/PleaseLogin.vue'
//创建并暴露一个路由器
const router = new VueRouter({
	routes:[
		{
			path:'/add',
			component:AddBlog,
			meta:{
				keepAlive:true,
				isAuth:true
			}
		},
		{
			path:'/',
			component:ShowBlog,
			meta:{
				keepAlive:true,
				isAuth:true
			},
		},
		{
			path:'/blog/:id',
			component:SingleBlog,
			meta:{
				keepAlive:true,
				isAuth:true
			}
		},
		{
			path:'/login',
			component:Login,
			name:'login',
			meta:{
				keepAlive:true,
				isAuth:false
			}
		},
		{
			path:'/register',
			component:Register,
			meta:{
				keepAlive:true,
				isAuth:false
			}
		},
		{
			path:'/PleaseLogin',
			component:PleaseLogin,
			meta:{
				keepAlive:true,
				isAuth:true
			}
		},
	],
	mode:"history"

})
//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
	console.log()
	if(to.meta.isAuth){ //判断是否需要鉴权
		if(document.cookie){
			next()
		}else{
			if(from.name !== null){
				alert('请登录')
			}
            next('/login')
		}
	}else{
		next()
	}
})
export default router