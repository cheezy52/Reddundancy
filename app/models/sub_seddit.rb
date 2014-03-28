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
  extend FriendlyId
  validates :name, :owner, presence: true
  validates :name, uniqueness: true
  validate :is_url_safe

  has_many :posts, inverse_of: :sub, foreign_key: :sub_id, dependent: :destroy
  belongs_to :owner, class_name: "User", inverse_of: :owned_subs
  has_many :user_subs, inverse_of: :sub, foreign_key: :sub_id, dependent: :destroy
  has_many :followers, through: :user_subs, source: :user

  friendly_id :name, :use => :slugged

  def is_url_safe
    if /[\W\s]/.match(self.name)
      errors.add(:sub_seddit,
      "name must contain only alphanumeric characters and underscores")
    end
  end
end
