Friendship = new Meteor.Collection('friendships');

Friendship.follow = function(friendId){
  this.insert({
    userId: Meteor.userId(),
    friendId: friendId
  });
};

Friendship.unfollow = function(friendId){
  var doc_id = Friendship.findOne({userId: Meteor.userId(), friendId: friendId})._id;
  this.remove({
    _id: doc_id
  });
};

Friendship.isFollowing = function(friendId) { 
  return this.findOne({
    userId: Meteor.userId(),
    friendId: friendId
  });
};

Friendship.followings = function(userId){
  return this.find({userId:userId}).count();
};

Friendship.followers = function(friendId) {
  return this.find({friendId: friendId}).count();
};

Friendship.timelineIds = function(userId){
  var timelineIds = this.find({
    userId: userId
  }).map(function(f){
          return f.friendId;
        });
  timelineIds.push(userId);
  return timelineIds;
};
