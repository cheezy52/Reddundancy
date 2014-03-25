class Api::CommentsController < ApplicationController
  before_action :ensure_signed_in, only: [:create, :update, :destroy]
  before_action :verify_ownership, only: [:update, :destroy]

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

  def update
    #@comment found in verify_ownership
    if @comment.update_attributes(comment_params[:body])
      render :show, locals: {comment: @comment}
    else
      render :json => @comment.errors.full_messages, :status => 422
    end
  end

  def destroy
    #@comment found in verify_ownership
    @child_comments = Comment.where(parent_id: @comment.id)
    puts @child_comments
    if @child_comments.empty?
      @comment.destroy
      render :show, locals: {comment: @comment}
    else
      #Does not explicitly prove the user didn't just submit one with this body
      #Could use update_attribute to bypass validations and set body as nil,
      #then have checks on render to display appropriate text;
      #don't like deliberately having invalid data, though.
      @comment.update(body: "Comment deleted")
      puts @comment.errors.full_messages
      render :show, locals: {comment: @comment}
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :parent_id, :post_id)
  end

  def verify_ownership
    @comment = Comment.includes(:owner).find(params[:id])
    head 403 unless @comment.owner == current_user
  end
end
