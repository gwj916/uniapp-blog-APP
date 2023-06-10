'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const { articleid, pagesize = 10, page = 1 } = event

	const list = await db.collection('article')
		.aggregate()
		.match({ _id: articleid })
		.unwind('$comments')
		.project({
			_id: 0,
			comments: 1
		})
		.replaceRoot({
			newRoot: '$comments'
		})
		.skip(pagesize * (page - 1))
		.limit(pagesize)
		.end()

	//返回数据给客户端
	return {
		code: 0,
		msg: '评论内容获取成功',
		data: list.data
	}
};
