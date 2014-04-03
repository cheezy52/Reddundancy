# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# create superadmin user
sed = User.create(username: "Seddit", password: SecureRandom::urlsafe_base64(16),
  email: "seddit@herokuapp.com")

#create guest user
guest = User.create!(username: "SedditGuest", password: "GuestPass",
  email: "guest@guest.guest")

#create fake seed accounts
alice = User.create(username: "SedditAlice", password: SecureRandom::urlsafe_base64(16),
  email: "alice@seddit.com")
bob = User.create(username: "SedditBob", password: SecureRandom::urlsafe_base64(16),
  email: "bob@seddit.com")
carol = User.create(username: "SedditCarol", password: SecureRandom::urlsafe_base64(16),
  email: "carol@seddit.com")
dan = User.create(username: "SedditDan", password: SecureRandom::urlsafe_base64(16),
  email: "dan@seddit.com")
eve = User.create(username: "SedditEve", password: SecureRandom::urlsafe_base64(16),
  email: "eve@seddit.com")
frank = User.create(username: "SedditFrank", password: SecureRandom::urlsafe_base64(16),
  email: "frank@seddit.com")

# create default subs
announce = SubSeddit.create(name: "SedditAnnouncements", owner: sed)
news = SubSeddit.create(name: "news", owner: sed)
pol = SubSeddit.create(name: "politics", owner: sed)
sci = SubSeddit.create(name: "science", owner: sed)
tech = SubSeddit.create(name: "technology", owner: sed)
ben = SubSeddit.create(name: "BenjaminSmith", owner: sed)
funny = SubSeddit.create(name: "funny", owner: sed)
aww = SubSeddit.create(name: "aww", owner: sed)

# create starting posts
  # "announce" sub
  welcome = Post.create(sub: announce, title: "Welcome to Seddit!", owner: sed)

  # "news" sub

  # "politics" sub

  # "science" sub

  # "technology" sub

  # "ben" sub
  self_plug = Post.create(sub: ben, link: "https://github.com/cheezy52",
    title: "That Ben Smith sure is a swell guy.", owner: sed)

    # add starting comments
    self_plug_c1 = Comment.create(post: self_plug, owner: sed,
      body: "He certainly is!", parent: nil)
    self_plug_c1_c1 = Comment.create(post: self_plug, owner: guest,
      body: "You know it!", parent: self_plug_c1)

  # "funny" sub

  # "aww" sub
