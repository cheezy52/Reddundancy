module Votable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :votable, dependent: :destroy
  end

  def karma
    upvotes - downvotes
  end

  def upvotes
    self.votes.select { |vote| vote.up }.length
  end

  def downvotes
    self.votes.select { |vote| !vote.up }.length
  end

  def user_already_voted?(user_id)
    !!self.votes.to_a.find { |vote| vote.owner_id == user_id }
  end

  def user_upvoted?(user_id)
    #Combine with user_already_voted? to determine if user downvoted
    !!self.votes.to_a.find { |vote| vote.owner_id == user_id && vote.up }
  end
end