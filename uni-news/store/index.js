import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyListData: uni.getStorageSync('history') || []
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyListData = history
		},
		CLEAT_HISTORY(state){
			state.historyListData = []
			// uni.setStorageSync('history',[])
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
		}
	}
})
export default store