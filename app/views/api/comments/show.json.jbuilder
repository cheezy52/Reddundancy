json.partial! "comment", comment: comment
json.comments comment.comments, partial: "comment_rec", as: :comment