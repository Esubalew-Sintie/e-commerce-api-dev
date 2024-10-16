# Ecommerce-API

A REST API for online e-commerce system

## Features:

- Token based Authentication and  Authorization
- Refresh tokens for preventing unauthorized access by blocking compromised or invalid tokens.
- Products listing
- Order placements
- File upload
- Custom Error Handling
- Database transactions 
- Server side schema validation.
- API Rate Limiting
- API Caching
- Swagger
- Logging

## Technology Stack:

- Node js
- Express Js
- PostgreSQL 
- Redis




## Usage

"/.env" update the values/settings to your own

## Install Dependencies

```
npm install
```
## Database Setup (PostgreSQL):
'''
    Create a PostgreSQL database named ecommerce:
    ## run the following command
    npx prisma migrate dev --name init

'''
## Run App

```
# Run in dev mode
npm run dev

```# e-commerce-api-dev
