# Resume Review

## Overview

Resume Review is a web app to upload their resumes and receive feedback on them. 
Members can prepare for career fairs, company visits, and job applications by running their resumes by
their peers, requesting specific changes or just asking for general opinions.
The site was made using Express, a Node.js framework.

## Developing locally

### NodeJS Bare Metal

Create `nodemon.json` with the following environment variables filled in:
```
{
  "env": {
    "PORT": "",
    "DB_NAME": "",
    "DB_USERNAME": "",
    "DB_PASSWORD": "",
    "S3_ACCESS_KEY_ID": "",
    "S3_SECRET_ACCESS_KEY": "",
    "S3_URL": "",
    "S3_BUCKET": "",
    "OIDC_CLIENT_ID": "",
    "OIDC_CLIENT_SECRET": "",
    "OIDC_CALLBACK_URL": "",
    "OIDC_SESSION_SECRET": "",
  }
}

and run `npm install`, then `nodemon resume-review`.

```

### Docker Container

Create `.env` withn the following environment variables filled in:
```
PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_URL=
S3_BUCKET=
OIDC_CLIENT_ID=
OIDC_CLIENT_SECRET=
OIDC_CALLBACK_URL=
OIDC_SESSION_SECRET=
```

Then run `docker build -t resume .` and `docker run --name resume --env-file .env -p CONTAINER_PORT:8080 resume`

Note: For local development, be sure to set OIDC_CALLBACK_URL to exactly `http://localhost:8080/auth/callback` or `http://localhost:4200/auth/callback`.

If you are deadset on using something else, you will need to reach out to an Ops Progra Member first.

## Credits

This project was inpsired from ![Computer Science House's Resume Review](https://github.com/computersciencehouse/resume-review)
