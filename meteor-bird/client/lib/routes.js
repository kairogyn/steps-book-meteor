Router.map(function(){
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'layout',
    data: function(){
      var _id = Meteor.userId();
      var timelineIds = Friendship.timelineIds(_id);
      return { 
               posts: Post.list(timelineIds),
               followers: Friendship.followings(Meteor.userId()),
               followings: Friendship.followings(Meteor.userId())
             }
    }
  });
  this.route('user', {
    path: '/user/:_id',
    template: 'user',
    layoutTemplate: 'layout',
    data: function() {
      var _id = this.params._id;
      var timelineIds = Friendship.timelineIds(_id);
      var isFollowing = Friendship.isFollowing(_id);
      Session.set('currentUserId', _id);
      Session.set('isFollowing', isFollowing);
      return {
        user: Meteor.users.findOne({_id: _id}),
        posts: Post.list(timelineIds),
        followers: Friendship.followers(_id),
        followings: Friendship.followings(_id)

      }
    }
  });
  this.route('follow', {
    path: '/user/:_id/follow',
    action: function(){
      var _id = this.params._id;
      Meteor.call("followUser", _id);
      this.redirect('/user/' + _id);
    }
  });
  this.route('unfollow', {
    path: '/user/:_id/unfollow',
    action: function(){
      var _id = this.params._id;
      Meteor.call("unfollowUser", _id);
      this.redirect('/user/' + _id);
    }
  });

});
