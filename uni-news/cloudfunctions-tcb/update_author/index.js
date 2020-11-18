'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	let {
		user_id,
		author_id
	} = event
	let user = await db.collection('user').doc(user_id).get()
	let author_likes_ids = user.data[0].author_likes_ids
	let authorObj = null
	if(author_likes_ids.includes(author_id)){
		authorObj = dbCmd.pull(author_id)
	}else{
		authorObj = dbCmd.addToSet(author_id)
	}
	await db.collection('user').doc(user_id).update({
		author_likes_ids:authorObj
	})
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '更新成功'
	}
};
