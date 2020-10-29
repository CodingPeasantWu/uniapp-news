export default function $https(options){
	const {url,data} = options
	const dataObj  = {
		user_id:'c54bd3a25f9161000188138f015bf328',
		...data
	}
	return new Promise((reolve,reject)=>{
		uniCloud.callFunction({
			name:url,
			data:dataObj
		}).then(res=>{
			if(res.result.code === 200){
				reolve(res.result)
			}else{
				reject(res.result)
			}
		}).catch(err=>{
			reject(err.result)
		})
	})
}