'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// const article = await db.collection('article').field({
	// 	// true 为只返回这个字段,false为不返回
	// 	content:false
	// }).get()
	const {
		user_id,
		value
	} = event
	
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	const article = await db.collection('article')
	.aggregate()
	// 追加字段
	.addFields({
		is_like:$.in(['$_id',article_likes_ids])
	})

	.project({
		content:0
	})
	.match({
		title:new RegExp(value)
	})
	.end()
	
	return {
		code:200,
		msg:'数据请求成功',
		data:article.data
  };
}