Post = new Meteor.Collection('posts');
Post.publish = function (message, name){
  var params = {
    message: message,
    date: new Date(),
    userId: Meteor.userId(),
    name: name
  };
  this.insert(params);
};

Post.list = function(usersId){
  return this.find(
   {userId: {"$in": usersId}},
   {sort: {date: -1}}
  );
}
