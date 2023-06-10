'use strict';
const db = uniCloud.database();
const dbcmd = db.command
exports.main = async (event, context) => {
	const { articleid, userid } = event;

	const user = await db.collection('user').doc(userid).get();
	const thumbs_up_article_ids = user.data[0].thumbs_up_article_ids
	let returnmag = '';
	let temparr = null;
	let thumbNumber = null;

	if (thumbs_up_article_ids.includes(articleid)) {
		temparr = dbcmd.pull(articleid);
		returnmag = '取消点赞';
		thumbNumber = -1;
	} else {
		returnmag = '点赞成功';
		temparr = dbcmd.addToSet(articleid);
		thumbNumber = 1
	}

	await db.collection('user').doc(userid).update({
		thumbs_up_article_ids: temparr
	})

	await db.collection('article').doc(articleid).update({
		thumbs_up_count: dbcmd.inc(thumbNumber)
	})


	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: returnmag
		}
	}
};
