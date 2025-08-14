import { Request, Response, NextFunction } from 'express';
import { CreateShipmentRequest, UpdateShipmentRequest, ShipmentStatus } from '../types/shipment';
import { createError } from './errorHandler';

const VALID_STATUSES: ShipmentStatus[] = ['In Transit', 'Arrived at Port', 'Delayed', 'Delivered'];

export const validateCreateShipment = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const data: CreateShipmentRequest = req.body;

  // Required fields validation
  if (!data.containerId?.trim()) {
    throw createError('Container ID is required', 400);
  }

  if (!data.originPort?.trim()) {
    throw createError('Origin port is required', 400);
  }

  if (!data.destinationPort?.trim()) {
    throw createError('Destination port is required', 400);
  }

  if (!data.departureDate) {
    throw createError('Departure date is required', 400);
  }

  if (!data.eta) {
    throw createError('ETA is required', 400);
  }

  // Date validation
  const departureDate = new Date(data.departureDate);
  const eta = new Date(data.eta);

  if (isNaN(departureDate.getTime())) {
    throw createError('Invalid departure date format', 400);
  }

  if (isNaN(eta.getTime())) {
    throw createError('Invalid ETA format', 400);
  }

  // Status validation (if provided)
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    throw createError(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`, 400);
  }

  // Coordinate validation (if provided)
  if (data.lastKnownLat !== undefined) {
    const lat = Number(data.lastKnownLat);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      throw createError('Invalid latitude. Must be between -90 and 90', 400);
    }
  }

  if (data.lastKnownLng !== undefined) {
    const lng = Number(data.lastKnownLng);
    if (isNaN(lng) || lng < -180 || lng > 180) {
      throw createError('Invalid longitude. Must be between -180 and 180', 400);
    }
  }

  next();
};

export const validateUpdateShipment = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const data: UpdateShipmentRequest = req.body;

  // At least one field should be provided for update
  if (!data.status && !data.eta && data.lastKnownLat === undefined && data.lastKnownLng === undefined) {
    throw createError('At least one field must be provided for update', 400);
  }

  // Status validation (if provided)
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    throw createError(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`, 400);
  }

  // ETA validation (if provided)
  if (data.eta) {
    const eta = new Date(data.eta);
    if (isNaN(eta.getTime())) {
      throw createError('Invalid ETA format', 400);
    }
  }

  // Coordinate validation (if provided)
  if (data.lastKnownLat !== undefined) {
    const lat = Number(data.lastKnownLat);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      throw createError('Invalid latitude. Must be between -90 and 90', 400);
    }
  }

  if (data.lastKnownLng !== undefined) {
    const lng = Number(data.lastKnownLng);
    if (isNaN(lng) || lng < -180 || lng > 180) {
      throw createError('Invalid longitude. Must be between -180 and 180', 400);
    }
  }

  next();
};

export const validateShipmentId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id <= 0) {
    throw createError('Invalid shipment ID. Must be a positive integer', 400);
  }

  req.params.id = id.toString();
  next();
};
