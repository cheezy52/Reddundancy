class Api::VotesController < ApplicationController
  def create
    @vote = current_user.owned_votes.build(vote_params)
    @votable = @vote.votable
    if @vote.save
      render :json => @vote
    else
      render :json => @vote.errors.full_messages, status: 422
    end
  end

  def update
    @vote = Vote.find(params[:id])
    if @vote
      @votable = @vote.votable
      if @vote.update_attribute(:up, vote_params[:up])
        render :json => @vote
      else
        render :json => @vote.errors.full_messages, status: 422
      end
    else
      head 404
    end
  end

  def destroy
    @vote = Vote.find(params[:id])
    if @vote
      @votable = @vote.votable
      if @vote.destroy
        render :json => @vote
      else
        render :json => @vote.errors.full_messages, status: 422
      end
    else
      head 404
    end
  end

  private
  def vote_params
    params.require(:vote).permit(:up, :votable_id, :votable_type)
  end
end
