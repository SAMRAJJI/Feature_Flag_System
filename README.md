# Feature Flag System

A backend Feature Flag Management System built using Node.js, Express.js, and MySQL. This system allows organizations to manage feature flags dynamically, enabling or disabling application features without requiring code redeployment.

## Features

* Create, view, update, and delete organizations
* Create and manage feature flags
* Enable or disable features dynamically
* RESTful API architecture
* MySQL database integration
* Environment variable configuration using dotenv
* JSON-based API responses
* Modular project structure

## Technology Stack

* Node.js
* Express.js
* MySQL
* dotenv
* REST API

## Installation

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/feature_flag_system.git
cd feature_flag_system
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=feature_flag_db
PORT=3000
```

### Run the Application

```bash
node server.js
```

## API Endpoints

### Organizations

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /organizations     | Get all organizations  |
| GET    | /organizations/:id | Get organization by ID |
| POST   | /organizations     | Create organization    |
| PUT    | /organizations/:id | Update organization    |
| DELETE | /organizations/:id | Delete organization    |

### Feature Flags

| Method | Endpoint   | Description            |
| ------ | ---------- | ---------------------- |
| GET    | /flags     | Get all feature flags  |
| GET    | /flags/:id | Get feature flag by ID |
| POST   | /flags     | Create feature flag    |
| PUT    | /flags/:id | Update feature flag    |
| DELETE | /flags/:id | Delete feature flag    |

## Database Schema

### organizations

* id
* name
* created_at

### feature_flags

* id
* organization_id
* flag_name
* is_enabled
* created_at

## Example Response

```json
{
  "id": 1,
  "flag_name": "new_dashboard",
  "is_enabled": true
}
```

## Security

* Database credentials are stored in `.env`
* Sensitive files are excluded using `.gitignore`
* Environment variables are not committed to GitHub

## Future Enhancements

* User authentication and authorization
* Percentage-based rollouts
* User targeting and segmentation
* Audit logging
* Admin dashboard
* API documentation using Swagger/OpenAPI

## Author

Sam Raj

M.Sc. Artificial Intelligence & Data Analytics
