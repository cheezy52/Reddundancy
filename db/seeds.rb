# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# create superadmin user
adm = User.create(username: "RedditLite", password: SecureRandom::urlsafe_base64(16),
  email: "RedditLite@herokuapp.com")

#create guest user
guest = User.create!(username: "RedditLiteGuest", password: "GuestPass",
  email: "guest@guest.guest")

#create fake seed accounts
alice = User.create(username: "RedditLiteAlice", password: SecureRandom::urlsafe_base64(16),
  email: "alice@RedditLite.com")
bob = User.create(username: "RedditLiteBob", password: SecureRandom::urlsafe_base64(16),
  email: "bob@RedditLite.com")
carol = User.create(username: "RedditLiteCarol", password: SecureRandom::urlsafe_base64(16),
  email: "carol@RedditLite.com")
dan = User.create(username: "RedditLiteDan", password: SecureRandom::urlsafe_base64(16),
  email: "dan@RedditLite.com")
eve = User.create(username: "RedditLiteEve", password: SecureRandom::urlsafe_base64(16),
  email: "eve@RedditLite.com")
frank = User.create(username: "RedditLiteFrank", password: SecureRandom::urlsafe_base64(16),
  email: "frank@RedditLite.com")

# create default subs
announce = SubReddit.create(name: "RedditLiteAnnouncements", owner: adm)
news = SubReddit.create(name: "news", owner: adm)
pol = SubReddit.create(name: "politics", owner: adm)
sci = SubReddit.create(name: "science", owner: adm)
tech = SubReddit.create(name: "technology", owner: adm)
ben = SubReddit.create(name: "BenjaminSmith", owner: adm)
funny = SubReddit.create(name: "funny", owner: adm)
aww = SubReddit.create(name: "aww", owner: adm)

# create starting posts
  # "announce" sub
  welcome = Post.create(sub: announce, title: "Welcome to RedditLite!", owner: adm)

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
