export default function $https(options){
	const {url,data} = options
	return new Promise((reolve,reject)=>{
		uniCloud.callFunction({
			name:url,
			data
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