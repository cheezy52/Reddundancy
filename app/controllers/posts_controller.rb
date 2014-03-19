class PostsController < ApplicationController
  before_action :ensure_signed_in, only: [:new, :create]
#   def index
#   end

  def new
    @post = SubSeddit.find(params[:sub_seddit_id]).posts.build
    render :new
  end

  def create
    @post = SubSeddit.find(params[:sub_seddit_id]).posts.build(post_params)
    @post.owner_id = current_user.id
    if @post.save
      flash[:notice] = "Post successfully created!"
      redirect_to post_url(@post)
    else
      flash[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def show
    @post = Post.includes(:comments, :votes, :sub).find(params[:id])
    render :show
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
