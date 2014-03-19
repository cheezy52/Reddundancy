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
  validates :up, :owner, :votable, presence: true
  validates_uniqueness_of :owner, :scope => :votable

  belongs_to :votable, polymorphic: true

  def self.karma(votable)
    self.find_by_votable_id(votable.id).length
  end
end
