'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const { userid } = event
    let user = await db.collection('user').doc(userid).get();
	let author_likes_ids = user.data[0].author_likes_ids
	

	let list = await db.collection('user')
	.aggregate()
	.addFields({
		id_like:$.in(['$id',author_likes_ids])
	})
	.project({
		loginName:false,
		password:false
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
