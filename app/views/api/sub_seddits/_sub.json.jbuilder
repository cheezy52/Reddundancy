json.(sub, :id, :owner_id, :name, :created_at, :updated_at)
json.user_is_owner(current_user == sub.owner)
json.is_favorited(sub.followers.include?(current_user))
json.followers(sub.followers.size)
# if sub.rank
#   json.favorite do
#     json.sub_id sub.id
#     json.rank sub.rank
#   end
# end
json.class_name("Sub")
json.owner_name(sub.owner.username)