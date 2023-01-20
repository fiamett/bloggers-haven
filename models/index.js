const User = require('./user');
const Post = require('./post');
const Comment = require ('./comment')

User.hasMany(Post,{
    foreignKey: 'creator_id'
})

User.hasMany(Comment,{
    foreignKey: 'creator_id'
})

Post.belongsTo(User,{
    foreignKey: 'creator_id'
})

Post.hasMany(Comment,{
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(Post,{
    foreignKey: 'post_id',
})

Comment.belongsTo(User,{
    foreignKey: 'creator_id'
})

module.exports = { User, Post, Comment };