class VotesController < ApplicationController
  def create
    puts vote_params[:up]
    @vote = current_user.owned_votes.build(vote_params)
    @votable = @vote.votable
    if @vote.save
      flash[:notice] = "Thanks for voting!"
      redirect_to @votable
    else
      flash[:errors] = @vote.errors.full_messages
      redirect_to @votable
    end
  end

  def update
    @vote = Vote.find_by(owner_id: current_user.id,
                         votable_id: vote_params[:votable_id],
                         votable_type: vote_params[:votable_type])
    @votable = @vote.votable
    if @vote
      if @vote.update_attribute(:up, vote_params[:up])
        flash[:notice] = "You're always free to change your mind!"
        redirect_to @votable
      else
        flash[:errors] = @vote.errors.full_messages
        redirect_to @votable
      end
    end
  end

  private
  def vote_params
    params.require(:vote).permit(:up, :votable_id, :votable_type)
  end
end
