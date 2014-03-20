class Api::CommentsController < ApplicationController
  def index
    @post = Post.includes(comments: :votes).find(params[:post_id])
    @comments = @post.comments
    render :json => @comments, :include => :votes
  end

  def show
    @comment = Comment.includes(:votes).find(params[:id])
    render :json => @comment, :include => :votes
  end
end
