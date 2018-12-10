# Tech-Made

## Sprint 3

### To Do's:

- Admin user can post a string to the user's project 

- [-] - Create login/signup error message views 
- [ ] - Fix website register form UI
- [ ] - Design Dashboard UI

### Notes
 MVP User authentication error handling user experience
 If a user registers with an email that already exists or username that already exists,
 - they should be prompted to login and have a flash message saying an account with that
 username and/or email already exists.
- Create frontend JavaScript to check that their niputted password is strong enough.
- If a user tries to login with an incorrect email/password
    - refresh the page and flash them that the login info is incorrect.


## Sprint 2

### To Do's:
- [X] - Create get getting-started route.
- [X] - Create get dashboard route.
- [X] - Create getting started form UI (Multi Page form that finishes with 'Sign Up' form.).

### Getting Started
Opening Form - Showcasing what we offer:
- Website Design
- Easy Content Management
- SSL Certifacte / Security
- Expertise and Passion

Next, How things usually work.
- We recieve a message from you with the basic info.
- We contact you back to gage whether or not this is someone we want to work with.
- We understand your wants and needs and hit the drawing board.
- We will come back to you with potential basic designs / themes to think about.
- You can always tell us you don't like anything and suggest anything.
- We start development.
- We build out our front end and back end system of your website simultaniously. 
- You can choose in your dashboard, how often you'd like to recieve an update

### Dashboard

So what is the dashboards purpose and what does it contain? The dashboard is where we communicate everything
with our clients, it is there go to spot for any questions.

What it contains:
 - Progress Tracker of their site.
 - An easy place for them to document their feedback on our work and have a log of our conversation.
 - Keep track of the contract / deadlines.
 - Customize settings as to how often they want us to text/email them the project milestones.
 - Importantly, submit timely payments through the dashboard portal with Stripe integration.

## Back Log Sprint

### To Do's
- [ ] - Create get signup route.
- [ ] - Create get login route.
- [ ] - set up MongoDB/Mongoose
- [ ] - Authenticate users with bcrypt/jwt. (Debated using basic-auth but it's not worth it in this case).
- [ ] - Inject dynamic content into dashboard view with handlebars helpers.
- [ ] - Create middleware authentication to use on all screens.
- [ ] - Configure subdomain *dashboard.techmade.co

## Sprint 1
### Homepage content:
- [X] Why We Exist
- [X] Services
- [X] How we work
- [X] Our Work
- [X] Get Started