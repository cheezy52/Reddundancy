# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :string(255)      not null
#  owner_id         :integer          not null
#  commentable_id   :integer          not null
#  commentable_type :string(255)      not null
#  created_at       :datetime
#  updated_at       :datetime
#

class Comment < ActiveRecord::Base
  validates :body, :owner, :commentable, presence: true

  belongs_to :commentable, polymorphic: true, inverse_of: :comments
  belongs_to :owner, class_name: "User", inverse_of: :owned_comments
  has_many :comments, as: :commentable, inverse_of: :commentable
  has_many :votes, as: :votable, inverse_of: :votable
end
