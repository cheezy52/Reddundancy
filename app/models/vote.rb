# == Schema Information
#
# Table name: votes
#
#  id           :integer          not null, primary key
#  up           :boolean          not null
#  owner_id     :integer          not null
#  votable_id   :integer          not null
#  votable_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#

class Vote < ActiveRecord::Base
  validates :owner, :votable, presence: true
  validates_uniqueness_of :owner, :scope => [:votable_id, :votable_type]
  validate :up_attr_exists

  belongs_to :votable, polymorphic: true
  belongs_to :owner, class_name: "User", inverse_of: :owned_votes

  def up_attr_exists
    errors.add(:up, "must not be nil") if up.nil?
  end
end
