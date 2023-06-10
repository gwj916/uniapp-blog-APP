'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const { userid } = event
    let user = await db.collection('user').doc(userid).get();
	let article_likes_ids = user.data[0].article_likes_ids
	

	let list = await db.collection('article')
	.aggregate()
	.addFields({
		id_like:$.in(['$_id',article_likes_ids])
	})
	.project({
		content:0
	})
	.match({
		id_like:true
	})
	.end()


	return {
		code:0,
		msg:'获取数据成功',
		data:list.data
	}
};
