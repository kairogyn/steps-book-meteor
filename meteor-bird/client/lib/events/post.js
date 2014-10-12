Template.post.events({
  "submit form": function(e,template){
    e.preventDefault();
    var textarea = template.find("textarea");
    Post.publish(textarea.value);
    textarea.value = "";
    return false;
  }
});
