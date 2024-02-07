# FED_Group1_Raeanne_Jeffrey_Assg02

## Velocity

Ngee Ann Polytechnic - Front End Development Assignment II

### Website live at:

https://velocityfed.netlify.app/

### Video Walkthrough:

<!-- https://www.loom.com/share/b2b5cea9697340fb994a075baf069e30?sid=c638001d-4e24-4094-a24a-d520f56197fb -->

## Idea For Assignment II

For Assignment 2, we decided to explore building an interactive e-commerce web application complete with sutiable gamification concepts and API calls. Our e-commerce website client is Velocity, an Official NIKE Retailer.

### Target Market

Average Website Visitor:

- From 18 years old
- Capable of making online purchases
- NIKE enthusiasts who lives in Singapore
- Busy work-life and prefers shopping online

### Site Owner’s Objectives and Goals

Velocity would like to be able to promote online presence and brand recognition through web branding. As a NIKE shoe retailer, they hope to have a website that is associated with being active, full of energy while maintaining a professional front. Velocity also aims to attract and retain more members to boost brand loyalty.

## Design Process

Taking into account Velocity's requirements, our proposed design aims to incoporate the following:

### Look and Feel

- Visual hierarchy: Using whitespace, font (size and color) and a simple layout to present content to users in clear and concise manner.

The primary colours that are used in the website is:

- Shades of Light Grey
- Black
- Yellow
- Orange

This is to enhance Velocity's brand image as a clean and minimal to bring the focus to the shoes. Bright and attention-grabbing colours, yellow and orange incites positive and empowering traits like energy, active and freshness.

### Gamifying the Experience

- To encourage membership signups, Members' Privilege includes:
  - Exclusive designs for members only
  - Earn and redeem points for cash rebates
  - More cashbacks on birthday months
  - Flash deals
- To entice and motivate customers, a progress bar is used as a visual aid to indicate how much more a customer should purchase to qualify for free shipping.
- Shoe Finder Quiz aims to deliver a more customised shopping experience by reccommending the most suitable shoe according to customer's answer.

## User Stories

- As a first-time visitor to Velocity, I want to find a walking shoe that looks similar to the one I currently have as well as be able to look at the product details:

  1. Click on Camera icon -> Image Search Page
  2. Image Search Page -> Click on 'Choose Another File' -> Choose file -> Website redirects to product listing page with shoes that are similar
  3. Click on any product card -> Selected product detail page

- As a first-time cisitor to Velocity, I want to make an account and view account details:
  1. Click on profile -> Login Page
  2. Sign in with Google -> Website redirects you back to home page
  3. Click on profile icon -> My Account page

### Wireframe

https://www.figma.com/file/XPogNB1whV7ch5bO8wb3W6/Velocity-UI?type=design&node-id=0%3A1&mode=design&t=mQjHcbvrWgSPeWiG-1

## Features Summary:

- Image Search

  - Using Google Cloud Vision API
  - https://cloud.google.com/vision

- Address Auto-Complete

  - Using Google Maps JavaScript API
  - https://developers.google.com/maps/documentation/javascript/place-autocomplete

- Google Sign-In

  - Using Google Sign-In
  - https://developers.google.com/identity/sign-in/web/sign-in

- Remember Me (Stay Logged-In to Account)

  - Using Local Storage to store Log-In Credentials

- Access Cart in Same Account From Multiple Devices

  - Using RestDB
  - https://restdb.io/

- Listing Products In Website From Database
  - Using RestDB
  - https://restdb.io/

### Home page:

The homepage includes a navigation bar consisting of links to all pages and a clickable logo that defaults to the Landing page. Users can click on the bag icon to view added items. Bottom of the landing page features 3 shortcuts to the product page (filtered by shoe type) and footer.

### Product Listing Page:

Products are dynamically populated using JS card design, each include product image, shoe type and price. Clicking on each card brings the user to the product detail page. Customer can filter display by gender, colour, type and price range.

### Product Detail Page:

Selected product detail page is dynamically created using JS,and displays more information. For Members Special shoes, only members signed in can purchase. Otherwise a sign in prompt is displayed.

### Checkout Page:

All products added to cart would be displayed, with total cost computed. Users can still manipulate product quantity before committing. The checkout process is divided into 3 simple forms, namely Payment, Shipping and Review Pages. Each aims to clearly guide users through the checkout process with intuitive information input design.

## Technologies Used

### JQuery

### Google Maps JavaScript API

### Google Identity Services library

### Google Cloud Vision AI

### RestDB

### Local Storage

### Bootstrap

### HTML

- To give semantic meaning to website.
- navbar.html, and footer.html files created to insert navbar and footer to every webpage instead of manually adding html elements to create a navbar and footer in every new page.

### CSS

- Style website in an aesthetically pleasing manner.
- Make website responsive so that it can be viewed seamlessly on all devices.
- Add animations to improve the user experience.

### JavaScript

<!-- - Create functions to allow users to interact with the website. For example, adding how many items they would like to add to cart, calculating and updating total item in cart its price.
- Adding items added to cart into local storage so that users can continue their shopping where they last left off before closing or exiting their browser. -->

### GitHub

- To push and store code on a remote repository.
- Allow version control for Assignment 2.
- Facility seemless collaboration among 2 developers

### Lottie Animation

- To add animations to indicate that an action has been completed successfully.
- Animations help to bring the website to live.

## Credits

- [Google Maps Auto-Complete Tutorial](https://www.youtube.com/watch?v=Q_GraCZJRiQ)
- [AWQ How to invoke a lambda function after Uploading an Image to S3 Bucket](https://youtu.be/7X-xI1PqzK0?si=jUWTx-vvuloMK1q9)
- [ChatGPT](https://chat.openai.com/)
