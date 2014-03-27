class CommentsController < ApplicationController
  # Rails UI is deprecated.  All content UI should be through Backbone.

  # def index
  # end
   def new
     #This and create are hacky and terrible,
     #and will be first up against the wall when the javalution comes
     if !(params[:comment_id].nil?)
       @parent_comment = Comment.find(params[:comment_id])
       @comment = @parent_comment.comments.build
       @post = @parent_comment.post
     else
       @post = Post.find(params[:post_id])
       @comment = @post.comments.build
       @parent_comment = nil
     end

     p @parent_comment
     render :new, locals: {comment: @comment, post: @post, parent_comment: @parent_comment}
   end

  def create
    if !(params[:comment_id].nil?)
      puts "creating comment on comment"
      @parent_comment = Comment.find(params[:comment_id])
      @comment = @parent_comment.comments.build(comment_params)
      @post = @parent_comment.post
      @comment.post = @post
    else
      puts "creating comment on post"
      @post = Post.find(params[:post_id])
      @comment = @post.comments.build(comment_params)
      @parent_comment = nil
    end

    @comment.owner = current_user
    if @comment.save
      flash[:notice] = "Comment submitted successfully!"
      redirect_to post_url(@post)
    else
      flash[:errors] = @comment.errors.full_messages
      render :new, locals: {comment: @comment, post: @post,
        parent_comment: @parent_comment}
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
