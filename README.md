# TransPorter

A full-stack application for tracking container shipments with real-time status updates and ETA calculations.

## Architecture

- **Frontend**: Blazor WebAssembly (C#)
- **Backend**: Node.js with Express.js
- **Database**: SQLite with Prisma ORM
- **Maps**: Leaflet.js integration
- **UI Framework**: Bootstrap 5

## Features

- 📦 **Shipment Management**: Add, view, update, and delete container shipments
- 🗺️ **Interactive Maps**: Visualize shipment locations using Leaflet maps
- ⏰ **ETA Calculation**: Automatic estimation of arrival times based on shipping routes
- 🔍 **Search & Filter**: Advanced filtering by status, container ID, or ports
- 📱 **Responsive Design**: Mobile-friendly interface with Bootstrap
- 🚀 **Real-time Updates**: Live status tracking and notifications

## Project Structure

```
ContainerShipmentTracker/
├── server/                  # Node.js Express Backend
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript type definitions
│   │   └── index.ts         # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   └── package.json
├── client/                  # Blazor WebAssembly Frontend
│   ├── Models/              # C# model classes
│   ├── Services/            # API and business logic services
│   ├── Pages/               # Blazor pages/components
│   ├── Layout/              # Layout components
│   └── wwwroot/             # Static assets
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- .NET 8 SDK
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database with sample data:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running at `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Build the project:
   ```bash
   dotnet build
   ```

4. Run the development server:
   ```bash
   dotnet run
   ```

The frontend will be running at `https://localhost:5001` or `http://localhost:5000`

## API Endpoints

### Shipments

- `GET /api/shipments` - Get all shipments
- `GET /api/shipments/:id` - Get shipment by ID
- `POST /api/shipments` - Create new shipment
- `PUT /api/shipments/:id` - Update shipment
- `DELETE /api/shipments/:id` - Delete shipment

### Request/Response Examples

#### Create Shipment
```json
POST /api/shipments
{
  "containerId": "MSKU7845123",
  "originPort": "Shanghai",
  "destinationPort": "Los Angeles",
  "departureDate": "2024-01-15T00:00:00Z",
  "status": "In Transit",
  "eta": "2024-02-15T00:00:00Z",
  "lastKnownLat": 35.6762,
  "lastKnownLng": 139.6503
}
```

## Database Schema

### Shipment Model
```prisma
model Shipment {
  id               Int      @id @default(autoincrement())
  containerId      String   @unique
  originPort       String
  destinationPort  String
  departureDate    DateTime
  status           String
  eta              DateTime
  lastKnownLat     Float?
  lastKnownLng     Float?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **Prisma**: Database ORM
- **SQLite**: Lightweight database
- **CORS**: Cross-origin resource sharing

### Frontend
- **Blazor WebAssembly**: C# in the browser
- **Bootstrap 5**: CSS framework
- **Font Awesome**: Icons
- **Leaflet.js**: Interactive maps
- **System.Net.Http.Json**: HTTP client for API calls

## Features Overview

### Dashboard
- Statistics overview (total, in transit, delayed, delivered)
- Recent shipments list
- Quick navigation to key features

### Shipment Management
- Comprehensive shipment listing with search and filter
- Create new shipments with auto-calculated ETAs
- Update shipment status and location
- Delete shipments with confirmation

### ETA Calculation
The system includes a sophisticated ETA calculation service that:
- Uses real port coordinates for distance calculation
- Considers average shipping speeds
- Applies delay factors for different routes
- Accounts for port operations and weather delays

### Responsive Design
- Mobile-first approach with Bootstrap
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## Development

### Adding New Features
1. Backend: Add routes in `server/src/routes/`
2. Frontend: Create Blazor components in `client/Pages/`
3. Update database schema in `prisma/schema.prisma`
4. Run migrations: `npx prisma migrate dev`

### Testing
- Backend: `npm test`
- Frontend: `dotnet test`

## Production Deployment

### Backend
- Build: `npm run build`
- Start: `npm start`
- Environment: Set `NODE_ENV=production`

### Frontend
- Build: `dotnet publish -c Release`
- Deploy the `bin/Release/net8.0/publish/wwwroot` folder

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
