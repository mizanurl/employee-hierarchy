# Employee Hierarchy API

## Setup Instructions

1. Install dependencies
   ```sh
   npm install
   ```
2. Set up the database with sample data
   ```sh
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
3. Start the server
   ```sh
   npm start
   ```

## Endpoints

### Login

`POST /auth/login`

- Authenticates a user and returns a JWT token.
- Use the credential {"email": "john@example.com", "password": "john123"} for login.

### Get Employee Hierarchy

`GET /employee/:id`

- Requires JWT authentication from the above login API
- Returns the employee hierarchy starting from the given employee ID.

## Testing

Run tests using

```sh
npm test
```

## Limitations

- Not enough test cases were created
- To improve performance Caching (say with Redis) can be integrated
- Deployment manual could not be done for the sake of time. In order to do that, Docker image can be generated.
