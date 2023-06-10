'use strict';
const db = uniCloud.database();
const dbcmd = db.command
exports.main = async (event, context) => {
	const {userid,authorid} = event;

	const user = await db.collection('user').doc(userid).get();
    const authorLike = user.data[0].author_likes_ids
    let returnmag = '';
	let author_ids =  null;
	if (authorLike.includes(authorid)) {
		author_ids = dbcmd.pull(authorid);
		returnmag = '取消关注';
	}else{
		returnmag = '关注作者成功';
		author_ids = dbcmd.addToSet(authorid);
	}

    await db.collection('user').doc(userid).update({
		author_likes_ids:author_ids
	})


	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:returnmag
		}
	}
};
