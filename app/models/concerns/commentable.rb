module Commentable
  extend ActiveSupport::Concern

  def num_comments
    self.comments.length
  end
end