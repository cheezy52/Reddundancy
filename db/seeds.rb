# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# create guest user
sed = User.create(username: "Seddit", password: SecureRandom::urlsafe_base64(16),
  email: "seddit@herokuapp.com")

guest = User.create(username: "SedditGuest", password: "GuestPass",
  email: "guest@guest.guest")

# create default subs
announce = SubSeddit.create(name: "SedditAnnouncements", owner: sed)
news = SubSeddit.create(name: "news", owner: sed)
pol = SubSeddit.create(name: "politics", owner: sed)
sci = SubSeddit.create(name: "science", owner: sed)
tech = SubSeddit.create(name: "technology", owner: sed)
ben = SubSeddit.create(name: "BenjaminSmith", owner: sed)
funny = SubSeddit.create(name: "funny", owner: sed)
aww = SubSeddit.create(name: "aww", owner: sed)

# subscribe guest user to subs
UserSub.create(user: guest, sub: announce, rank: 1)
UserSub.create(user: guest, sub: tech, rank: 2)
UserSub.create(user: guest, sub: ben, rank: 3)

# create starting posts
self_plug = Post.create(sub: ben, link: "https://github.com/cheezy52",
  title: "That Ben Smith sure is a swell guy.", owner: sed)

# add starting comments
self_plug_c1 = Comment.create(post: self_plug, owner: sed,
  body: "He certainly is!", parent: nil)
self_plug_c1_c1 = Comment.create(post: self_plug, owner: guest,
  body: "You know it!", parent: self_plug_c1)