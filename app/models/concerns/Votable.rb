module Votable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :votable, dependent: :destroy
  end

  def karma
    self.votes.select { |vote| vote.up }.length -
      self.votes.select { |vote| !vote.up }.length
  end

  def user_already_voted?(user_id)
    !!self.votes.to_a.find { |vote| vote.owner_id == user_id }
  end
end