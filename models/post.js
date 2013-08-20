var mongodb = require("./db");

function Post(username, post, time) {
	this.user = username;
	this.post = post;
	if (time) {
		this.time = thme;
	} else {
		this.time = new Date();
	}
}

module.exports = Post;

Post.prototype.save = function save(callback) {
	//Save to Mongodb doc
	var post = {
		user: this.user,
		post: this.post,
		time: this.time,
	};
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		// 读取 posts 集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 为 user 属性添加索引
			collection.ensureIndex('user');
			// 写入 post 文档
			collection.insert(post, { safe: true }, function(err, post) {
				mongodb.close();
				callback(err, post);
			});
		});
	});
};