# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'date'

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
  today = Date.today
  (0..105).to_a.reverse.each do |days_ago|
    day_post = Post.create(sub: announce, owner: adm,
      title: "Daily maintenace for #{today - days_ago}",
      body: "Reddundancy's daily maintenance for #{today - days_ago} is now concluded.  Thank you for your patience.")
    a1 = Comment.create(post: day_post, owner: alice, parent: nil, 
      body: "Another daily maintenance?!  That's #{105 - days_ago} times now!")
    b1 = Comment.create(post: day_post, owner: bob, parent: a1, 
      body: "Oh, be quiet, Alice.  It seems like you're here complaining every day.")
    a2 = Comment.create(post: day_post, owner: alice, parent: b1, 
      body: "Well, maybe when they stop bringing the server down, I'll stop complaining.")
    c1 = Comment.create(post: day_post, owner: carol, parent: b1, 
      body: "And it seems like you're here complaining about Alice's complaining every day.")
    b2 = Comment.create(post: day_post, owner: bob, parent: c1, 
      body: "We have to go deeper.")
    d1 = Comment.create(post: day_post, owner: dan, parent: b2, 
      body: "BWONNNNNNG")
    e1 = Comment.create(post: day_post, owner: eve, parent: nil, 
      body: "It's all good, take all the time you need!")
    a3 = Comment.create(post: day_post, owner: alice, parent: e1, 
      body: "White-knighting detected")
    f1 = Comment.create(post: day_post, owner: frank, parent: a3,
      body: "Because they're the poster we deserve, but not the one we need right now...")
  end
  welcome = Post.create(sub: announce, title: "Welcome to Reddundancy!", 
    owner: adm)

  # "news" sub

  # "politics" sub

  # "science" sub

  # "technology" sub


  # "ben" sub
  self_plug = Post.create(sub: ben, link: "http://cheezy52.github.io",
    title: "That Ben Smith sure is a swell guy.", owner: adm,
    body: "And so modest too!")

    # add starting comments
    self_plug_c1 = Comment.create(post: self_plug, owner: adm,
      body: "He certainly is!", parent: nil)
    self_plug_c1_c1 = Comment.create(post: self_plug, owner: guest,
      body: "You know it!", parent: self_plug_c1)

  # "funny" sub

  # "aww" sub

def random_vote(user, votable)
  vote = rand(3)
  if vote == 0
    Vote.create(owner: user, votable: votable, up: false)
  elsif vote == 1
    Vote.create(owner: user, votable: votable, up: true)
  end
end

User.all.each do |user|
  UserSub.create(user: user, sub: announce, rank: 1)
  UserSub.create(user: user, sub: ben, rank: 2)
  UserSub.create(user: user, sub: tech, rank: 3) if rand(3) > 0
  UserSub.create(user: user, sub: aww, rank: 4) if rand(3) > 1
  Post.all.each do |post|    
    random_vote(user, post)
  end
  Comment.all.each do |comment|
    random_vote(user, comment)
  end
end