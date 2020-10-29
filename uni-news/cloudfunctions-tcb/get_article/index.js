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
		page = 1,
		pageSize = 10,
		name
	} = event
	
	let matchObj = {}
	
	if(name !== '全部'){
		matchObj = {
			classify:name
		}
	}
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	const article = await db.collection('article')
	.aggregate()
	// 追加字段
	.addFields({
		is_like:$.in(['$_id',article_likes_ids])
	})
	.match(matchObj)
	.project({
		content:0
	})
	// 一次跳过多少数据
	.skip(pageSize*(page-1))
	.limit(pageSize)
	.end()
	
	return {
		code:200,
		msg:'数据请求成功',
		data:article.data
  };
}