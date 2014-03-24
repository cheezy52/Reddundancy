class Api::PostsController < ApplicationController
  def index
    @posts = Post.includes(:sub, :owner, :votes, :comments)
                 .where(sub_id: params[:sub_seddit_id])
    render :index, locals: {posts: @posts}
  end

  def show
    #Note: Comments sent as a flat structure
    #All entries in the comment tree (top-level comments and subcomments)
    #will be included, but the JSON structure does not reflect the tree structure
    @post = Post.includes(:sub, :owner, :votes, comments:
      [:votes, :comments, :owner]).find(params[:id])
    render :show, locals: {post: @post}
  end
end
