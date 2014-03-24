class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.includes({:votes => :owner}, :owner, :comments, :post)
                       .where(post_id: params[:post_id])
    render :index, locals: {comments: @comments}
  end

  def show
    #Note: Subcomments sent as a nested structure
    #Very inefficient compared to index or posts/show if comments deeply nested
    #Recommend using index or posts/show and filtering on client-side
    @comment = Comment.includes({:votes => :owner}, :owner, :post, comments:
      [:votes, :owner, :comments]).find(params[:id])
    render :show, locals: {comment: @comment}
  end

  def create
    @comment = current_user.owned_comments.build(comment_params)

    @comment.owner = current_user
    if @comment.save
      render :show, locals: {comment: @comment}
    else
      render :json => @comment.errors.full_messages, :status => 422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :parent_id, :post_id)
  end
end
