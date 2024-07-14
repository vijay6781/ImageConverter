# meraki-pe-api

## Setup

- Setup your aws credentials and aws profile using `aws configure --profile <aws profile>`
- `npm install`
- use `yarn start` to run`
- use `yarn db:migrate` for migrate database
- use `yarn db:create` for create database
- use `yarn db:seeds` for insert seed data
- use `yarn lint:fix` for fix the lint erroe

## Environment variables

- Environment variables can be setup in `.env.development` file
- add your `CREDENTIALS` to a .env.development file Like

# Port number
PORT=3000
NODE_ENV=development

# PROXY APIS
PROXY_BASE_API_URL=http://********/
CLIENT_ID=**********
CLIENT_SECRET=********

DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=******
DB_NAME=officeBanao
DB_PORT=5432
DB_DIALECT=postgres

#   I m a g e C o n v e r t e r  
 