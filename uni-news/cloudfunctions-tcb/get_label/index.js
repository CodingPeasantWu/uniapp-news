'use strict';
const db = uniCloud.database()//获取数据库的引用
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const label = await db.collection('label').get()// 获取表'unieba21b7' label的集合对象
	// const res = await collection.limit(10).get()// 获取表中的10条数据，结果为json格式
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:label.data
	}
};
