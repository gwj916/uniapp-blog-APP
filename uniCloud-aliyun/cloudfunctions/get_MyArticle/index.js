'use strict';
const db = uniCloud.database();
const dbcmd = db.command;
exports.main = async (event, context) => {
	const { userid } = event;
    let user = await db.collection('user').doc(userid).get();
	let article_ids = user.data[0].article_ids;

	const list = await db.collection('article')
	.aggregate()
	.project({
		content:0,
		comments:0
	})
	.match({
		id:dbcmd.in(article_ids)
	})
	.end();
	//返回数据给客户端
	return {
		code:0,
		data:list.data
	}
};
