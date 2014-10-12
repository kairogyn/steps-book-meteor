Post = new Meteor.Collection('posts');
Post.publish = function (message){
  this.insert({
    message: message,
    date: new Date(),
    userId: Meteor.userId()
  });
};

Post.list = function(userId){
  return this.find({userId: userId});
}
