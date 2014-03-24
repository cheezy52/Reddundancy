json.(sub, :id, :owner_id, :name, :created_at, :updated_at)
json.class_name("Sub")
json.owner_name(sub.owner.username)