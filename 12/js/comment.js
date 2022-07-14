//здесь будет функционал по добавлению комментов на сайте

function checkCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

checkCommentLength('Comment test', 140);

