json.partial! "post", post: post
json.comments post.comments, partial: "api/comments/comment", as: :comment