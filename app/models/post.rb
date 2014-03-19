# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  link       :string(255)
#  owner_id   :integer          not null
#  sub_id     :integer
#  created_at :datetime
#  updated_at :datetime
#

class Post < ActiveRecord::Base
  validates :link, :owner, :sub, presence: true

  belongs_to :sub, class_name: "SubSeddit", inverse_of: :posts
  belongs_to :owner, class_name: "User", inverse_of: :owned_posts
  has_many :comments, as: :commentable, inverse_of: :commentable
  has_many :votes, as: :votable, inverse_of: :votable
end
