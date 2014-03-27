class Api::PostsController < ApplicationController
  before_action :verify_ownership, only: [:update, :destroy]

  def index
    #extra SQL query, but allows use of friendlyID
    @sub = SubSeddit.friendly.find(params[:sub_seddit_id].to_s.downcase)
    @posts = Post.includes(:sub, :owner, :comments, :votes => :owner)
                 .where(sub_id: @sub.id)
                 .order(:created_at => :desc)
                 .page(params[:page])
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

  def update
    #@post found in verify_ownership
    if @post.update_attributes(post_params)
      render :show, locals: {post: @post}
    else
      render :json => @post.errors.full_messages, status: 422
    end
  end

  def destroy
    #@post found in verify_ownership
    if @post
      @post.destroy
      render :show, locals: {post: @post}
    else
      head 404
    end
  end

  private
  def post_params
    params.require(:post).permit(:link, :title, :sub_id)
  end

  def verify_ownership
    @post = Post.includes(:owner).find(params[:id])
    head 403 unless @post.owner == current_user
  end
end
