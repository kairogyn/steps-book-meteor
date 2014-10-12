Template.timeline.helpers({
  posts: function(){
    return Post.list(Meteor.userId());
  }
});
