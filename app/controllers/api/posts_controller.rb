class Api::PostsController < ApplicationController
  def index
    @sub = SubSeddit.includes(posts: [:comments, :votes, :owner])
      .find(params[:sub_seddit_id])
    render :index, locals: {sub: @sub}
  end

  def show
    #Note: Comments sent as a flat structure
    #All entries in the comment tree (top-level comments and subcomments)
    #will be included, but the JSON structure does not reflect the tree structure
    @post = Post.includes(:votes, :comments => [:votes, :comments, :owner])
      .find(params[:id])
    render :show, locals: {post: @post}
  end
end
