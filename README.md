# One Comfort Clothes

Ecommerce project carried out for the Backend course with JS at Coderhouse, in this we will find t-shirts, pants, shoes and extras such as bags and caps that we can buy through Paypal, ideally I recommend creating a Sandbox account (test mode) in https://developer.paypal.com/ since in this way all payments will be simulated and the product will not really be charged

## Stack used

- MERN

## Tools

#### Backend:

- bcryptjs (hash password of users)
- CORS
- JWT + Google OAuth (auth users)
- morgan (HTTP request logger in console)
- nodemailer (email sent after registration and purchase)
- Paypal Sandbox API
- socket.io (chat in realtime between users and admin)
- twilio (send SMS & Whatsapp)
- winston (for custom logs)

#### Frontend:

- axios
- formik
- framer-motion
- jwt-decode
- moment
- random-avatar-generator
- react-icons
- react-toastify
- redux
- redux thunk
- sass
- slick-carousel
- socket.io-client
- yup

## TO REMEMBER

At the time of making the final checkout of each product for purchase, a paypal modal window will open in which you must log in, you should not do it with your original account, but with a sandbox account (test mode) since in this way You will not be charged any real payment, but it will be simulated, these are the steps you must follow:

1. Log in to the Developer Dashboard with your original account and navigate to the Sandbox >> Accounts page.
2. Click Create Account.
3. Set the Account Type to Personal.
4. Select a Country.
5. Click Create Account.
