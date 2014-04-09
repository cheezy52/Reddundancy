# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# create superadmin user
adm = User.create(username: "Reddundancy", password: SecureRandom::urlsafe_base64(16),
  email: "Reddundancy@herokuapp.com")

#create guest user
guest = User.create!(username: "ReddundancyGuest", password: "GuestPass",
  email: "guest@guest.guest")

#create fake seed accounts
alice = User.create(username: "ReddundancyAlice", password: SecureRandom::urlsafe_base64(16),
  email: "alice@Reddundancy.com")
bob = User.create(username: "ReddundancyBob", password: SecureRandom::urlsafe_base64(16),
  email: "bob@Reddundancy.com")
carol = User.create(username: "ReddundancyCarol", password: SecureRandom::urlsafe_base64(16),
  email: "carol@Reddundancy.com")
dan = User.create(username: "ReddundancyDan", password: SecureRandom::urlsafe_base64(16),
  email: "dan@Reddundancy.com")
eve = User.create(username: "ReddundancyEve", password: SecureRandom::urlsafe_base64(16),
  email: "eve@Reddundancy.com")
frank = User.create(username: "ReddundancyFrank", password: SecureRandom::urlsafe_base64(16),
  email: "frank@Reddundancy.com")

# create default subs
announce = SubReddit.create(name: "ReddundancyAnnouncements", owner: adm)
news = SubReddit.create(name: "news", owner: adm)
pol = SubReddit.create(name: "politics", owner: adm)
sci = SubReddit.create(name: "science", owner: adm)
tech = SubReddit.create(name: "technology", owner: adm)
ben = SubReddit.create(name: "BenjaminSmith", owner: adm)
funny = SubReddit.create(name: "funny", owner: adm)
aww = SubReddit.create(name: "aww", owner: adm)

# create starting posts
  # "announce" sub
  welcome = Post.create(sub: announce, title: "Welcome to Reddundancy!", owner: adm)

  # "news" sub

  # "politics" sub

  # "science" sub

  # "technology" sub

  # "ben" sub
  self_plug = Post.create(sub: ben, link: "https://github.com/cheezy52",
    title: "That Ben Smith sure is a swell guy.", owner: adm)

    # add starting comments
    self_plug_c1 = Comment.create(post: self_plug, owner: adm,
      body: "He certainly is!", parent: nil)
    self_plug_c1_c1 = Comment.create(post: self_plug, owner: guest,
      body: "You know it!", parent: self_plug_c1)

  # "funny" sub

  # "aww" sub
