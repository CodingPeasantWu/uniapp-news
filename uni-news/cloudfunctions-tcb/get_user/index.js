'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const {
		user_id = ''
	} = event
	let userInfo = await db.collection('user').doc(user_id).get()
	if(!user_id){
		return {
			code:201,
			msg:'获取失败'
		}
	}
	//返回数据给客户端
	return {
		code:200,
		msg:'获取成功',
		data:userInfo.data[0]
	}
};
