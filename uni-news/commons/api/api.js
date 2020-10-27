// import {get_label} from './list.js'
const reuqireApi = require.context(
	// api目录的相对路径
	'.',
	//是否查询子目录
	false,
	//查询文件的后缀
	/.js$/
)
// console.log(reuqireApi.keys())
let module = {}
reuqireApi.keys().forEach((item,index)=>{
	// console.log(item)
	if(item === './api.js') return
	Object.assign(module,reuqireApi(item))
	
})
	// console.log(module)

export default module