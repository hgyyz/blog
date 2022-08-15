// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import AddBlog from '../components/AddBlog'
import ShowBlog from '../components/ShowBlogs'
import SingleBlog from '../components/SingleBlog'
import Login from '../components/Login'
import Register from '../components/Register'
import PleaseLogin from '../components/PleaseLogin.vue'
//创建并暴露一个路由器
export default new VueRouter({
	routes:[
		{
			path:'/add',
			component:AddBlog,
			meta:{
				keepAlive:true
			}
		},
		{
			path:'/',
			component:ShowBlog,
			meta:{
				keepAlive:true
			},
		},
		{
			path:'/blog/:id',
			component:SingleBlog,
			meta:{
				keepAlive:true
			}
		},
		{
			path:'/login',
			component:Login,
			meta:{
				keepAlive:true
			}
		},
		{
			path:'/register',
			component:Register,
			meta:{
				keepAlive:true
			}
		},
		{
			path:'/PleaseLogin',
			component:PleaseLogin,
			meta:{
				keepAlive:true
			}
		},
	],
	mode:"history"
})
