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
#  title      :string(255)      not null
#

class Post < ActiveRecord::Base
  validates :owner, :sub, :title, presence: true

  belongs_to :sub,
    class_name: "SubSeddit",
    foreign_key: :sub_id,
    inverse_of: :posts
  belongs_to :owner, class_name: "User", inverse_of: :owned_posts
  has_many :comments, inverse_of: :post
  has_many :votes, as: :votable, inverse_of: :votable
end
