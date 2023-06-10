'use strict';
const db = uniCloud.database();
const dbcmd = db.command;
exports.main = async (event, context) => {
	const { userid, articleid, content } = event;
	
	let userInfo = await db.collection('user').doc(userid).get()
	userInfo = userInfo.data[0];

	let Commentobj = {
		comment_id: nnid(5),
		comment_content: content,
		create_time: Date.now(),
		author: {
			author_id: userInfo._id,
			author_name: userInfo.author_name,
			avater: userInfo.avatar,
			professional: userInfo.professional
		}
	}

	Commentobj = dbcmd.unshift(Commentobj)
	
	await db.collection('article').doc(articleid).update({
		comments: Commentobj
	});
	
	function nnid(num) {
		return Number(Math.random().toString().substr(3, num) + Date.now()).toString(36);
	}
	return {
		code: 0,
		data: {
			msg:'添加成功'
		}
	}
};
