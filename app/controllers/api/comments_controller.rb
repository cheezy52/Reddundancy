class Api::CommentsController < ApplicationController
  def index
    @post = Post.includes(comments: [:votes, :owner, :comments])
      .find(params[:post_id])
    render :index, locals: {post: @post}
  end

  def show
    #Note: Subcomments sent as a nested structure
    #Very inefficient compared to index or posts/show if comments deeply nested
    #Recommend using index or posts/show and filtering on client-side
    @comment = Comment.includes(:votes, :owner, comments: [:votes, :owner, :comments])
      .find(params[:id])
    render :show, locals: {comment: @comment}
  end
end
