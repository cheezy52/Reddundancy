class PostsController < ApplicationController
  before_action :ensure_signed_in, only: [:new, :create]
#   def index
#   end

  def new
    @post = SubSeddit.find(params[:sub_seddit_id]).posts.build
    render :new, locals: {post: @post}
  end

  def create
    @post = SubSeddit.find(params[:sub_seddit_id]).posts.build(post_params)
    @post.owner_id = current_user.id
    if @post.save
      flash[:notice] = "Post successfully created!"
      redirect_to post_url(@post)
    else
      flash[:errors] = @post.errors.full_messages
      render :new, locals: {post: @post}
    end
  end

  def show
    @post = Post.includes(:votes, :sub, :owner).find(params[:id])
    #comments not in includes due to load/sort function in next line
    @post_comments_by_parent_id = Comment.post_comments_by_parent_id(@post.id)
    render :show, locals: {post: @post,
      post_comments_by_parent_id: @post_comments_by_parent_id}
  end

#   def edit
#   end
#
#   def update
#   end
#
#   def destroy
#   end

  private
  def post_params
    params.require(:post).permit(:link, :title)
  end
end
