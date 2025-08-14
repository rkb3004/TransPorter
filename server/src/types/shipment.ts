export interface Shipment {
  id?: number;
  containerId: string;
  originPort: string;
  destinationPort: string;
  departureDate: Date;
  status: ShipmentStatus;
  eta: Date;
  lastKnownLat?: number | null;
  lastKnownLng?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ShipmentStatus = 'In Transit' | 'Arrived at Port' | 'Delayed' | 'Delivered';

export interface CreateShipmentRequest {
  containerId: string;
  originPort: string;
  destinationPort: string;
  departureDate: string; // ISO date string
  status?: ShipmentStatus;
  eta: string; // ISO date string, computed by frontend
  lastKnownLat?: number;
  lastKnownLng?: number;
}

export interface UpdateShipmentRequest {
  status?: ShipmentStatus;
  eta?: string;
  lastKnownLat?: number;
  lastKnownLng?: number;
}

export interface ShipmentSearchQuery {
  search?: string;
  status?: ShipmentStatus;
  limit?: number;
  offset?: number;
}
