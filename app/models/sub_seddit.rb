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
end
