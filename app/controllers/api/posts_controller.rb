class Api::PostsController < ApplicationController
  def index
    @sub = SubSeddit.includes(posts: [:comments, :votes]).find(params[:sub_seddit_id])
    @posts = @sub.posts
    render :json => @posts, :include => [:comments, :votes]
  end

  def show
    @post = Post.includes(:votes, :comments => [:votes, :comments]).find(params[:id])
    render :show, locals: {post: @post}
  end
end
