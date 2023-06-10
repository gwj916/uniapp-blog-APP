'use strict';
const db = uniCloud.database();
const dbcmd = db.command
exports.main = async (event, context) => {
	const { article_id } = event

	await db.collection('article').update({
		browse_count: dbcmd.inc(1)
	})
	const articlelist = await db.collection('article')
		.aggregate()
		.match({
			_id: article_id
		})
		.project({
			comments: 0
		})
		.end()

	return {
		code: 0,
		msg: '文章获取成功',
		data: articlelist.data[0]
	}
};