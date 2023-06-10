'use strict';
const db = uniCloud.database();
const dbcmd = db.command;
exports.main = async (event, context) => {
	const { userid, articleid } = event;
	const userInfo = await db.collection('user').doc(userid).get()
	const articleIds = userInfo.data[0].article_likes_ids
	let articlearr = null;
	let msg = null;
	if (articleIds.includes(articleid)) {
		articlearr = dbcmd.pull(articleid);
		msg = '取消成功'
	} else {
		articlearr = dbcmd.addToSet(articleid);
		msg = '收藏成功'
	}
	await db.collection('user').doc(userid).update({
		article_likes_ids: articlearr
	})
	const updateuser = await db.collection('user').doc(userid).get()
	return {
		code: 0,
		data: {
			msg,
			newuserInfo:updateuser.data[0]
		}
	}
};
