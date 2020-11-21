import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyListData: uni.getStorageSync('history') || [],
		userInfo:	uni.getStorageSync('userInfo') || {}
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyListData = history
		},
		CLEAT_HISTORY(state){
			state.historyListData = []
			// uni.setStorageSync('history',[])
		},
		SET_USERINFO(state,userInfo){
			state.userInfo = userInfo
		}
	},
	actions:{
		setHistory({commit,state},history){
			let historyList = state.historyListData
			historyList.unshift(history)
			uni.setStorageSync('history',historyList)
			commit('SET_HISTORY_LIST',historyList)
		},
		clearHistory({commit}){
			uni.removeStorageSync('history')
			commit('CLEAT_HISTORY')
		},
		setUserInfo({commit,state},userInfo){
			uni.setStorageSync('userInfo',userInfo)
			commit('SET_USERINFO',userInfo)
		}
	}
})
export default store