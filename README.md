# Intro
This is a simple script to help developing email templates. It is basically an easy to use abstraction of nodemailer. It currently supports sending html with embedded images.

# Instalation
Install it using \
`npm install -g js-mail-sender`
or\
`npm install js-mail-sender`

# Usage

## Environment variables
This package uses dotenv to set environment variables. You must create a file called `.env` in the root folder  and set the variables:

- EMAIL_USERNAME: The username for smtp authentication
- EMAIL_PASSWORD: The password for smtp authentication
- EMAIL_HOST: The smtp server's host
- EMAIL_SECURE: 1 if uses port 465 and TLS connection, 0 if uses 587 or 25 and no TLS
- EMAIL_TO: The email receiver
- EMAIL_FROM: The email sender
- EMAIL_SUBJECT: The email's subject

Example:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_SECURE=0
EMAIL_USERNAME=example@gmail.com
EMAIL_PASSWORD=SeCuRePaSsWoRd
EMAIL_TO=example@gmail.com
EMAIL_FROM=example@gmail.com
EMAIL_SUBJECT="My subject"
```

Note: if you install it globally, you'll have to create de `.env` file in the js-mail-sender's folder in the global node_modules.

## Html
After setting the environment variables you'll need an html file. Run the code below to use it:
`js-mail-sender < your-file-path >`

## Images
js-mail-sender will automatically link the images in the imgs tags's srcs. You just need to make sure the html can be opened in the browser and the images are shown correctly. 