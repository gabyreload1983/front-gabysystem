# GabySystem FrontEnd

Web App developmented with React.js

![React](https://raw.githubusercontent.com/github/explore/main/topics/react/react.png)

## Features

- Service Works handler
- Search Products and Customers
- Statistics
- List of Ordered Products
- Customer Summaries
- Commissions

## Technologies Used

- Vite
- React.js
- Bootstrap
- Sass
- Axios
- Sweetalert2

## Project Structure

## Getting Stared

To set up GabySystem Web App and get it running on your local development environment, follow these steps:

### Prerequisites

- Linux or Windows
- Visual Studio
- NODE.js >= 18
- Docker
- Docker Compose
- MongoDB <a href="https://github.com/gabyreload1983/mongodb-gabysystem" target="_blank">README</a>
- [Urbano Server DEV](#urbano-server-dev)
- Gabysystem API RESTFull [README](https://github.com/gabyreload1983/api-gabysystem/blob/main/README.md)

### Development

1. Clone the repository to your local machine.
2. Run npm run dev

## Deploy

1. Rename front-gabysystem-template.yml to front-gabysystem.yml and copy into the server
2. Complete data of production
3. Run docker-compose -f front-gabysystem.yml up -d

## Urbano Server DEV

1. Create a Virtual Machine with Windows 10 or higher
2. Install Urbano Server
3. Stop MySQL Service
4. Copy and replace database backup
5. Restart MySQL Service
6. Create firewall rules for entry and exit on port 3306
