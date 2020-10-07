# Intro
This is a simple script to help developing email templates. It is basically an easy to use abstraction of nodemailer. It currently supports sending html with embedded images.

# Instalation
Install it using:<br/>
`npm install -g @plinio_mayer/e-mailer`<br/>
or<br/>
`npm install @plinio_mayer/e-mailer`

# Usage

## Configuring
You need to make some initial configurations to use this script. Run the command below:<br/>
`e-mailer --init`<br/>
It'll prompt some questions about the host configurations. If you need to change them later you may repeat the command, or change the `config.json` in the root of the project manually.

## Send the email
After setting the environment variables you'll need an html file. Run the code below to use it:<br/>
```e-mailer --from < sender-email > --to < receiver-email > --sub < email-subject > < your-html-file-path >```<br/>
\*\*\***Use quotes if you need to send a subject with spaces**<br/>
\*\*\***Don't use backslash (\\) for html file path, use always slashes (/)**
<br/>

Example:<br/>
```e-mailer --from my.email@gmail.com --to his.email@gmail.com --sub "The best subject" my_folder/index.html```

## Images
e-mailer will automatically link the images in the imgs tags's srcs. You just need to make sure the html can be opened in the browser and the images are shown correctly.

## Known bugs
The currently package to read the console (readline-sync) allows to mask the password, but it cancels any input like backspace or ctrl+c. Unfortunately you'll have to close the terminal if misspell your password or want to terminate de process.

# Feedback
E-mail me: pctmayer@gmail.com
