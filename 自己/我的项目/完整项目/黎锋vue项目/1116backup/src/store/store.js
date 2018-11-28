import Vuex from 'vuex'
import defaultState from './state/state'

import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
const isDev = process.env.NODE_ENV ==='development'
export default ()=>{
	return new Vuex.Store({
//		strict:isDev,//只有开发环境使用
		state:defaultState,
	mutations,
	getters,
	actions,
	modules:{
		a:{
			state:{
			text:1
			},
			mutation:{
				updateText(state,text){
					console.log(state)
					state.text = text
				}
			}

		},
		b:{
			state:{
			text:2
				
			}

		}
	}
	})
}
