class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.includes(:votes, :owner, :comments, :post)
                       .where(post_id: params[:post_id])
    render :index, locals: {comments: @comments}
  end

  def show
    #Note: Subcomments sent as a nested structure
    #Very inefficient compared to index or posts/show if comments deeply nested
    #Recommend using index or posts/show and filtering on client-side
    @comment = Comment.includes(:votes, :owner, :post, comments:
      [:votes, :owner, :comments]).find(params[:id])
    render :show, locals: {comment: @comment}
  end
end
