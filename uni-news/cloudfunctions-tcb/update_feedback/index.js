'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		imgList = [],
		content = ''
	} = event
	await db.collection('feedback').add({
		user_id,
		imgList,
		content
	}) 
	//返回数据给客户端
	return {
		code:200,
		msg:'数据上传成功'
	}
};
