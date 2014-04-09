Reddundancy is a simple Reddit clone, intended to develop and demonstrate development ability.  As a content-aggregation site, Reddundancy collects user-submitted links, placed into "sub-reddits", and allows voting and commenting on links by users.  Functionality and user interface should be generally familiar to users of Reddit.

Reddundancy was developed using Rails 4 and Ruby 1.9.3.  It does not use any 3rd-party APIs.


A basic guide to what a user can do on Reddundancy:

-User accounts: Signup, signin, signout.  A guest account is available to browse functionality, for those who wish to view the app's features without creating an account.  (NYI) New users will require e-mail confirmation of their accounts; password reset will also be available via e-mail.  

-Content submission: A user can, of course, submit links to the site, comment on existing links (or other comments thereon), and upvote/downvote posts and comments to register their approval or disapproval of the content in question.  (NYI) User karma for submitted links and karma will be tracked and visible on that user's homepage/show page.

-Sub-reddits: A user can create a sub-reddit of their own.  (NYI) A sub-reddit owner will have additional access privileges as the owner and can appoint moderators with a more limited set of increased privileges.  (NYI) Owners can mark their sub-reddit private, requiring users to subscribe to that sub-reddit before being able to view its posts at all, and/or can require themselves or a moderator to approve subscription requests.

-Customizable user experience: A user can subscribe to sub-reddits, allowing links to those sub-reddits on the user's navbar for easy reference.  Users can customize the order of links on their navbar.  (NYI) Highly-rated links from those sub-reddits will appear in a content overview specific to that user.

-(NYI) Notifications and messaging: A user will receive notifications when one of their submissions (either link or comment) receives a comment in reply.  Users can customize which events will notify them.  Users can also message one another directly.

-(NYI) Customizable UI: A user can choose from one of multiple different themes to flavor their homepage display.  Additionally, a sub-reddit owner can choose a theme for their own sub-reddit; a user can choose to override a sub-reddit display theme with their own if they so desire.


Some details of implementation:

-Rails server: Ruby on Rails is used to serve content for such features as user authentication and the user homepage in a "traditional" multi-page style.

-Single-page front-end: To enhance user experience, Javascript, jQuery, and Backbone.js are used to make a "single-page" interface for the user-submitted content, allowing responsive navigation between the sub-reddits, posts and comments users have created without needing a full page reload.