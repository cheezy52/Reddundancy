class CommentsController < ApplicationController
  # def index
  # end

   def new
     @post = Post.find(params[:post_id])
     @comment = @post.comments.build
     render :new, locals: {comment: @comment, post: @post}
   end

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.owner = current_user
    if @comment.save
      flash[:notice] = "Comment submitted successfully!"
      redirect_to post_url(@post)
    else
      flash[:errors] = @comment.errors.full_messages
      render :new, locals: {comment: @comment, post: @post}
    end
  end

  # def show
  # end
  #
  # def edit
  # end
  #
  # def update
  # end
  #
  # def destroy
  # end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end
