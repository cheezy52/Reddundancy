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

seed_users = [alice, bob, carol, dan, eve, frank]

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

  # "ben" sub
  self_plug = Post.create(sub: ben, link: "http://cheezy52.github.io",
    title: "That Ben Smith sure is a swell guy.", owner: adm,
    body: "And so modest too!")

    # add starting comments
    self_plug_c1 = Comment.create(post: self_plug, owner: adm,
      body: "He certainly is!", parent: nil)
    self_plug_c1_c1 = Comment.create(post: self_plug, owner: guest,
      body: "You know it!", parent: self_plug_c1)

  # "news" sub
  n1 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://www.reuters.com/article/2015/03/02/us-usa-gaymarriage-nebraska-idUSKBN0LY1MM20150302", 
    title: "US judge rules Nebraska same-sex marriage ban unconstitutional")
  n2 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://www.pcworld.com/article/2891232/google-confirms-carrier-plans-details-coming-soon.html",
    title: "Google plans its own US mobile service",
    body: "And about time!")
  n3 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://www.foxnews.com/us/2015/03/02/4m-in-gold-stolen-from-truck-in-north-carolina/",
    title: "$4 million in gold stolen from truck in North Carolina")
  n4 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://money.cnn.com/2015/03/02/technology/facebook-envy/index.html",
    title: "Too much Facebook leads to envy and depression",
    body: "What else is new?")
  n5 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://pix11.com/2015/02/27/man-caught-carpooling-with-wooden-passenger-in-hov-lane-of-long-island-expressway-cops/",
    title: "Man caught carpooling with wooden 'passenger' in HOV lane",
    body: "Wish I'd thought of this...")
  n6 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://www.washingtonpost.com/local/crime/two-arrested-in-separate-attempts-to-access-white-house-grounds/2015/03/02/c5bebd60-c0de-11e4-9271-610273846239_story.html?tid=sm_tw",
    title: "Two arrested in separate attempts to access White House grounds")
  n7 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://www.theguardian.com/us-news/2015/feb/28/homan-square-protest-chicago-police-black-site?CMP=share_btn_fb",
    title: "Homan Square protesters demand answers over Chicago police 'black site'",
    body: "Scary stuff!")
  n8 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://nyti.ms/1AolZ1Z",
    title: "Fear envelops Russia after killing of Putin critic Boris Nemtsov")
  n9 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://www.whdh.com/story/28224512/fake-mustache-falls-off-during-attempted-bank-withdrawal",
    title: "Robber's fake mustache falls off during attempted bank withdrawal",
    body: "Fail.  At least put some effort into your disguise!")
  n10 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://ktla.com/2015/03/01/los-angeles-police-shoot-kill-man-in-downtown-confrontation/",
    title: "Los Angeles police shoot, kill man in Skid Row confrontation")
  n11 = Post.create(sub: news, owner: seed_users.sample,
    link: "http://fortune.com/2015/02/27/how-apple-lost-533-million-to-an-8th-grade-dropout-patent-troll/?xid=yahoo_fortune",
    title: "How Apple lost $533 million to an 8th-grade dropout patent troll")

  # "politics" sub
  p1 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://www.reuters.com/article/2015/03/02/us-usa-gaymarriage-nebraska-idUSKBN0LY1MM20150302", 
    title: "US judge rules Nebraska same-sex marriage ban unconstitutional")
  p2 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://www.theguardian.com/us-news/2015/feb/28/homan-square-protest-chicago-police-black-site?CMP=share_btn_fb",
    title: "Homan Square protesters demand answers over Chicago police 'black site'",
    body: "Scary stuff!")
  p3 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://nyti.ms/1AolZ1Z",
    title: "Fear envelops Russia after killing of Putin critic Boris Nemtsov")
  p4 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://www.upi.com/Top_News/US/2015/02/28/NSAs-bulk-collection-of-American-data-gets-approved-again/9931425167552/",
    title: "NSA's bulk data collection of American data approved again, a year after promised end")
  p5 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://nymag.com/daily/intelligencer/2015/02/inhofes-insane-climate-denial-speech.html",
    title: "Senator tosses snowball onto Senate floor as refutation of climate science",
    body: "Sounds like maybe he needed to 'chill' out!")
  p6 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://www.politico.com/story/2015/03/supreme-court-independent-redistricting-115642.html?hp=l1_3",
    title: "Supreme Court considers constitutionality of independent redistricting",
    body: "An end to the long life of the gerrymander?")
  p7 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://www.washingtonpost.com/blogs/wonkblog/wp/2015/03/02/dea-warns-of-stoned-rabbits-if-utah-passes-medical-marijuana/",
    title: "DEA warns of stoned rabbits if Utah passes medical marijuana",
    body: "After all, most rabbits like 'grass', don't they?")
  p8 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://www.nytimes.com/2015/03/02/us/justice-department-report-to-fault-police-in-ferguson.html?_r=0",
    title: "Justice Department to fault Ferguson police, seeing racial bias in traffic stops")
  p9 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://www.washingtonpost.com/blogs/wonkblog/wp/2015/03/01/this-is-the-best-explanation-of-gerrymandering-you-will-ever-see/",
    title: "How to Steal an Election: A Visual Guide")
  p10 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://simplicity.laserfiche.com/content/white-house-hires-its-first-data-scientist",
    title: "White House Hires its First Data Scientist")
  p11 = Post.create(sub: pol, owner: seed_users.sample,
    link: "http://www.reuters.com/article/2015/03/02/us-usa-fed-audit-poll-idUSKBN0LY0DT20150302",
    title: "Americans say keep politics out of the Fed")
  
  # "science" sub
  s1 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://smbc-comics.com/index.php?db=comics&id=2063#comic",
    title: "Prohibitively expensive trash-compacting method 400x More Awesome Than Anything Currently In Use")
  s2 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.newscientist.com/article/dn27059-germkilling-molecules-identified-in-alligator-blood.html?cmpid=RSS%7CNSNS%7C2012-GLOBAL%7Conline-news",
    title: "Germ-killing molecules identified in alligator blood")
  s3 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.vocativ.com/culture/science/rainforest-deforestation/",
    title: "NASA satellite imagery shows rain forest deforestation is accelerating")
  s4 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.ns.umich.edu/new/releases/22720-forbidden-quantum-leaps-possible-with-high-res-spectroscopy#.VPSPa9bw5bc.reddit",
    title: "New spectroscopy technique allows 1000 times more precision")
  s5 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.vocativ.com/culture/science/how-pigeons-dodge-taxis/",
    title: "Pigeons dodge city traffic by strategic wing-folding",
    body: "Clever little birds!")
  s6 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.sciencedaily.com/releases/2015/03/150302121617.htm",
    title: "Peanut consumption associated with decreased mortality from cardiovascular diseases",
    body: "So does this mean eating a whole jar of peanut butter is good for my heart?")
  s7 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.scientificamerican.com/article/giant-asteroid-collision-may-have-radically-transformed-mars/",
    title: "Giant asteroid collision may have radically transformed Mars")
  s8 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.vocativ.com/culture/science/birdstrikes-aircrashes-birds-air-disasters/",
    title: "Scientists identify cause of midair bird strikes on planes")
  s9 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.scientificamerican.com/article/overuse-of-antibiotics-caused-infections-by-bug-that-killed-29-000-in-1-year/",
    title: "Overuse of antibiotics contributed to 29,000 deaths from resistant bacteria in 1 year")
  s10 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://www.sciencedirect.com/science/article/pii/S1934590915000569#",
    title: "Stem cells generated from skin cells found to improve motor function in monkeys with Parkinson's")
  s11 = Post.create(sub: sci, owner: seed_users.sample,
    link: "http://phys.org/news/2015-02-purring-tempo-cats-attention.html",
    title: "Purring tempo, sliding notes grab cats' attention")
  
  # "technology" sub
  t1 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://smbc-comics.com/index.php?db=comics&id=2063#comic",
    owner: seed_users.sample,  
    title: "Prohibitively expensive trash-compacting method 400x More Awesome Than Anything Currently In Use")
  t2 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://www.pcworld.com/article/2891232/google-confirms-carrier-plans-details-coming-soon.html",
    title: "Google plans its own US mobile service")
  t3 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://www.ns.umich.edu/new/releases/22720-forbidden-quantum-leaps-possible-with-high-res-spectroscopy#.VPSPa9bw5bc.reddit",
    title: "New spectroscopy technique allows 1000 times more precision")
  t4 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://www.dailymail.co.uk/sciencetech/article-2946329/The-world-s-accurate-clock-Optical-lattice-clock-loses-just-one-second-16-BILLION-years.html",
    title: "Japanese scientists create most accurate atomic clock ever, within 1 second per 16 billion years",
    body: "Probably wouldn't stop me from being late to dinner though...")
  t5 = Post.create(sub: tech, owner: seed_users.sample,
    link: "https://www.unrealengine.com/blog/ue4-is-free",
    title: "Unreal Engine 4 and all future updates now available for free",
    body: "Unreal!")
  t6 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://www.theverge.com/2015/3/1/8127445/htc-vive-valve-vr-headset",
    title: "Valve announces VR headset",
    body: "Half-Life 3 confirmed!")
  t7 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://gizmodo.com/sandisk-squeezes-200gb-into-a-tiny-microsd-card-1688307827",
    title: "SanDisk announces world's first 200GB microSD card")
  t8 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://www.washingtonpost.com/blogs/innovations/wp/2015/02/25/googles-artificial-intelligence-breakthrough-may-have-a-huge-impact-on-self-driving-cars-and-much-more/",
    title: "Google's AI breakthrough may have huge impact on self-driving cars and more")
  t9 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://bgr.com/2015/03/01/galaxy-s6-specs-galaxy-s6-edge-specs-samsung/",
    title: "Samsung unveils Galaxy S6 and Galaxy S6 edge")
  t10 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://www.columbian.com/news/2015/mar/01/toyota-rolls-out-first-hydrogen-fuel-cell-vehicles/",
    title: "Toyota rolls out first hydrogen fuel cell vehicles")
  t11 = Post.create(sub: tech, owner: seed_users.sample,
    link: "http://www.nytimes.com/2015/03/02/technology/apples-new-job-selling-a-smartwatch-to-an-uninterested-public.html?_r=1",
    title: "Apple's new job: selling a smartwatch to an uninterested public")

  # "funny" sub
  f1 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://smbc-comics.com/index.php?db=comics&id=2063#comic",  
    title: "Prohibitively expensive trash-compacting method 400x More Awesome
    Than Anything Currently In Use")
  Comment.create(post: t1, owner: carol, parent: nil,
    body: "You just stole this from the technology sub, didn't you?")
  f2 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://gunshowcomic.com/458",
    title: "A School of Fish",
    body: "Don't you make that stupid fish face at me!")
  f3 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://2.bp.blogspot.com/-jGPE1OKPRWU/URY5pgOz8iI/AAAAAAAAJqY/2Ut09K4bc5U/s1600/i-dont-care.gif",
    title: "When a friend asks me to help clean up after a party")
  f4 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://www.smbc-comics.com/?db=comics&id=1849#comic",
    title: "The Infinite Lobster Dream")
  f5 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://www.reactiongifs.us/wp-content/uploads/2014/01/ba_dum_tss_pirates_band_of_misfits.gif",
    title: "After hearing someone make an over-elaborate pun...")
  f6 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://i.imgur.com/UNHiheN.gif",
    title: "Some of the commenters on this sub...")
  f7 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://i3.kym-cdn.com/photos/images/facebook/000/000/681/what-you-did-there-i-see-it.thumbnail.jpg",
    title: "What you did there...",
    body: "I see it")
  f8 = Post.create(sub: funny, owner: seed_users.sample,
    link: "https://lh4.googleusercontent.com/-g6P_DhyLXxg/UxTahqCJMCI/AAAAAAAA-a0/yAL_kBKqTig/w328-h166/HE2ATd2.gif",
    title: "U wot m8?")
  f9 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://i.imgur.com/y9jn7b9.gif",
    title: "Get dunked")
  f10 = Post.create(sub: funny, owner: seed_users.sample,
    link: "https://www.youtube.com/watch?v=xzpndHtdl9A",
    title: "After friends rage when I beat them in Call of Duty")
  f11 = Post.create(sub: funny, owner: seed_users.sample,
    link: "http://xkcd.com/246/",
    title: "Making logic puzzles more exciting...")

  # "aww" sub
  a1 = Post.create(sub: aww, owner: seed_users.sample, 
    link: "http://new.livestream.com/FosterKittenCam",
    title: "Kitten Cam!", 
    body: ":3")
  a2 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh5.googleusercontent.com/-ZFk3OI7RpOA/VIOP-9vek-I/AAAAAAAAB1U/Thzyz_9r6lM/w1139-h641-no/IMG_20141206_152335374.jpg",
    title: "Yin and Yang")
  a3 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh4.googleusercontent.com/-bA6zkIEUCyw/U3I9IE2FuJI/AAAAAAAABR8/NOr-d276gTU/w1139-h681-no/IMAG0379.jpg",
    title: "Do I see a new friend?")
  a4 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh3.googleusercontent.com/-URHslVvbox0/VBSIk2tdNeI/AAAAAAAABi0/RsUVCyRgqmA/w1139-h681-no/IMAG0438.jpg",
    title: "If I fits, I sits")
  a5 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh5.googleusercontent.com/-Kqf_yBqT2FM/VOeisKxsw1I/AAAAAAAACFo/vJ0tHxFGx4I/w484-h860-no/IMG_20150220_130934819.jpg",
    title: "Reclining for a rest")
  a6 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh6.googleusercontent.com/--qbAOPyltIA/VOpKAFGa8II/AAAAAAAACGk/NaIt2yeTdQI/w484-h860-no/IMG_20150222_132820685_HDR.jpg",
    title: "Breadcat dough rising in the sun")
  a7 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh3.googleusercontent.com/-39h9Izzc-yk/VN_JMXvdgHI/AAAAAAAACB0/cqrFuA8ieLA/w484-h860-no/IMG_20150214_141600408.jpg",
    title: "Cats: actually liquids")
  a8 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh4.googleusercontent.com/-7dgx8MTFLsk/VI9x5sIim6I/AAAAAAAAB2c/gSWaXAg9Qck/w1139-h641-no/IMG_20141215_154218433_HDR.jpg",
    title: "Squirrel?!")
  a9 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh3.googleusercontent.com/-7eio7IOgBlQ/VHuq4fvA1YI/AAAAAAAAByE/3VmIbZPaChY/w1139-h641-no/IMG_20141130_154013037.jpg",
    title: "You make a good pillow...")
  a10 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh4.googleusercontent.com/-do12ku1ynOQ/VPSmE1HYU2I/AAAAAAAACKA/q53tvSYobqI/w485-h860-no/IMG_20150302_095914305-MOTION.gif",
    title: "Change places!")
  a11 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh4.googleusercontent.com/-pc1jcsBs7ZQ/U3q69PxkA0I/AAAAAAAABYI/SFhH9WE6bBE/w515-h861-no/IMAG0407.jpg",
    title: "Snuggled to sleep")
  a12 = Post.create(sub: aww, owner: seed_users.sample,
    link: "https://lh3.googleusercontent.com/-k0-zv6Vg9Ds/U3pvGqGFgmI/AAAAAAAABXA/ER4Kn_kXzlg/w515-h861-no/IMAG0402.jpg",
    title: "An unfair fight")

def random_vote(user, votable)
  vote = rand(3)
  if vote == 0
    Vote.create(owner: user, votable: votable, up: false)
  elsif vote == 1
    Vote.create(owner: user, votable: votable, up: true)
  end
end

def random_post_comment(user, post)
  comment = rand(10)
  if comment == 0
    Comment.create(owner: user, post: post, parent: nil, 
      body: "Interesting!")
  elsif comment == 1
    Comment.create(owner: user, post: post, parent: nil, 
      body: "Hmmm...")
  elsif comment == 2
    Comment.create(owner: user, post: post, parent: nil, 
      body: "Thanks for sharing!")
  elsif comment == 3
    Comment.create(owner: user, post: post, parent: nil,
      body: "Why did you even bother posting this?")
  end
end

def random_comment_comment(user, post, parent_comment)
  comment = rand(10)
  if comment == 0
    Comment.create(owner: user, post: post, parent: parent_comment, 
      body: "I'm with you on this one!")
  elsif comment == 1
    Comment.create(owner: user, post: post, parent: parent_comment,
      body: "I guess I never thought of it that way!")
  elsif comment == 2
    Comment.create(owner: user, post: post, parent: parent_comment,
      body: "Do you really think so?")
  elsif comment == 3
    Comment.create(owner: user, post: post, parent: parent_comment,
      body: "Stop to think before you comment next time!")
  end
end

User.all.each do |user|
  UserSub.create(user: user, sub: announce, rank: 1)
  UserSub.create(user: user, sub: ben, rank: 2)
  UserSub.create(user: user, sub: tech, rank: 3) if rand(3) > 0
  UserSub.create(user: user, sub: aww, rank: 4) if rand(3) > 1
  Post.all.each do |post|    
    random_vote(user, post)
    random_post_comment(user, post)
  end
  Comment.all.each do |comment|
    random_vote(user, comment)
    random_comment_comment(user, comment.post, comment)
  end
end