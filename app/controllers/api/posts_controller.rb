class Api::PostsController < ApplicationController
  def index
    @posts = Post.includes(:sub, :owner, :comments, :votes => :owner)
                 .where(sub_id: params[:sub_seddit_id])
    render :index, locals: {posts: @posts}
  end

  def show
    #Note: Comments sent as a flat structure
    #All entries in the comment tree (top-level comments and subcomments)
    #will be included, but the JSON structure does not reflect the tree structure
    @post = Post.includes(:sub, :owner, { :votes => :owner }, comments:
      [:votes, :comments, :owner]).find(params[:id])
    render :show, locals: {post: @post}
  end

  def create
    @post = SubSeddit.find(post_params[:sub_id]).posts.build(post_params)
    @post.owner_id = current_user.id
    if @post.save
      render :show, locals: {post: @post}
    else
      render :json => @post.errors.full_messages, status: 422
    end
  end

  private
  def post_params
    params.require(:post).permit(:link, :title, :sub_id)
  end
end
