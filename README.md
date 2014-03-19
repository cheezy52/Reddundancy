Seddit is a simple Reddit clone, intended to develop and demonstrate development ability.  As a content-aggregation site, Seddit collects user-submitted links, placed into "sub-seddits", and allows voting and commenting on links by users.  Functionality and user interface should be generally familiar to users of Reddit.

Seddit was developed using Rails 4 and Ruby 1.9.3.  It does not use any 3rd-part APIs.


A basic guide to what a user can do on Seddit:

-(NYI) User accounts: Signup, signin, signout.  New users require e-mail confirmation of their accounts; password reset is also available via e-mail.  A guest account is available to browse functionality, for those who wish to view the app's features without creating an account.

-(NYI) Customizable user homepage: A user can subscribe to sub-seddits, allowing links to those sub-seddits on the user's navbar for easy reference and allowing highly-rated links from those sub-seddits to appear in a content overview specific to that user.  Users can customize the order of links on their navbar, and which subscribed sub-seddits appear at all.

-(NYI) Content submission: A user can, of course, submit links to the site, comment on existing links (or other comments thereon), and upvote/downvote posts and comments to register their approval or disapproval of the content in question.  User karma for submitted links and karma will be tracked and visible on that user's homepage/show page.

-(NYI) Sub-seddits: A user can create a sub-seddit of their own, granting them additional access privileges as the owner and allowing them to appoint moderators with a more limited set of increased privileges.  Owners can mark their sub-seddit private, requiring users to subscribe to that sub-seddit before being able to view its posts at all, and/or can require themselves or a moderator to approve subscription requests.

-(NYI) Notifications and messaging: A user will receive notifications when one of their submissions (either link or comment) receives a comment in reply.  Users can customize which events will notify them.  Users can also message one another directly.

-(NYI) Customizable UI: A user can choose from one of multiple different themes to flavor their homepage display.  Additionally, a sub-seddit owner can choose a theme for their own sub-seddit; a user can choose to override a sub-seddit display theme with their own if they so desire.


Some details of implementation:

-(NYI) Rails server: Ruby on Rails is used to serve content for such features as user authentication and the user homepage in a "traditional" multi-page style.

-(NYI) Single-page sub-seddits: To enhance user experience, Javascript, jQuery, and Backbone.js are used to make sub-seddit views "single-page", allowing responsive navigation between the posted links and comment threads within that sub-seddit.