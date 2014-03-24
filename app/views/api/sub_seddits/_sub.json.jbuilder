json.(sub, :id, :owner_id, :name, :created_at, :updated_at)
json.user_is_owner(current_user == sub.owner)
json.class_name("Sub")
json.owner_name(sub.owner.username)