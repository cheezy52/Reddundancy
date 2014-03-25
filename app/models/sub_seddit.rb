# == Schema Information
#
# Table name: sub_seddits
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  owner_id   :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class SubSeddit < ActiveRecord::Base
  validates :name, :owner, presence: true
  validates :name, uniqueness: true

  has_many :posts, inverse_of: :sub, foreign_key: :sub_id, dependent: :destroy
  belongs_to :owner, class_name: "User", inverse_of: :owned_subs
end
