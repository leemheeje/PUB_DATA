import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import 'url-search-params-polyfill';
Vue.use(Vuex)

import router from '../router/index.js'

export default new Vuex.Store({
	state: {
		isAuth: false, //로그인 구분
		userInfo:null,//로그인했을때 유저정보
		currentAtc: null,
		allAtc: null
	},
	mutations: {
		getAtc(state, payload) {
			state.currentAtc = payload
		},
		getAllAtc(state, payload) {
			state.allAtc = payload
		},
		getAuthSignIn(state, payload){
			/**
			 * 로그인됐을때 ->
			 * sessionStorage 등등 로그인됐을때 처리하는 구문
			 */
			state.isAuth = true;
			
			//세션 저장
			sessionStorage.setItem('login', true);
			
			//Works로 이동
			router.push("/works").catch(err => {});
			
			
			//state.userInfo = payload
		},
		getAuthSignOut(state){
			/**
			 * 로그인아웃 ->
			 */
			state.isAuth = false
			//state.userInfo = {}
		}
	},
	actions: {
		getAtc({ commit }, payload) {
			return new Promise(resolve=>{
				if(typeof payload === 'boolean'){
					commit('getAtc', payload)
				}else{
					axios.get(payload).then(res => {
						if(res.data){
							commit('getAtc', res.data)
						}else{
							alert('데이타가 존재하지 않습니다.')
							router.push({name:'Home'})
						}
						resolve()
					}).catch(err=>{
					})
				}
			})
		},
		getAllAtc({commit},payload){
			axios.get(payload).then(res => {
				commit('getAllAtc', res.data.CrList.list)
			})
		},
		getAuthIn({commit},payload){
			let params = new URLSearchParams();
			params.append('usr_id' , payload.params.usr_id)
			params.append('usr_pw' , payload.params.usr_pw)
			axios.post(`${payload.url}`, params).then(res=>{
				if(res.data.usrYn === 'Y'){
					commit('getAuthSignIn',res.data)
				}else{
					alert(res.data.msg)
				}
			})
		}
	},
	modules: {
	}
})
