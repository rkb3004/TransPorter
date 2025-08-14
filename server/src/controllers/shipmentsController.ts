import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { CreateShipmentRequest, UpdateShipmentRequest, ShipmentSearchQuery } from '../types/shipment';
import { createError } from '../middleware/errorHandler';

/**
 * Get all shipments with optional search and filtering
 */
export const getShipments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: ShipmentSearchQuery = req.query;
    const { search, status, limit = 50, offset = 0 } = query;

    // Build where clause for filtering
    const where: any = {};
    
    if (search) {
      where.OR = [
        { containerId: { contains: search, mode: 'insensitive' } },
        { originPort: { contains: search, mode: 'insensitive' } },
        { destinationPort: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (status) {
      where.status = status;
    }

    // Get shipments with pagination
    const shipments = await prisma.shipment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: Math.min(Number(limit), 100), // Maximum 100 records per request
      skip: Number(offset)
    });

    // Get total count for pagination
    const total = await prisma.shipment.count({ where });

    res.json({
      data: shipments,
      pagination: {
        total,
        limit: Number(limit),
        offset: Number(offset),
        hasMore: Number(offset) + shipments.length < total
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single shipment by ID
 */
export const getShipmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    const shipment = await prisma.shipment.findUnique({
      where: { id }
    });

    if (!shipment) {
      throw createError('Shipment not found', 404);
    }

    res.json(shipment);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new shipment
 */
export const createShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data: CreateShipmentRequest = req.body;

    // Check if container ID already exists
    const existingShipment = await prisma.shipment.findUnique({
      where: { containerId: data.containerId }
    });

    if (existingShipment) {
      throw createError('A shipment with this container ID already exists', 409);
    }

    // Create new shipment
    const shipment = await prisma.shipment.create({
      data: {
        containerId: data.containerId,
        originPort: data.originPort,
        destinationPort: data.destinationPort,
        departureDate: new Date(data.departureDate),
        status: data.status || 'In Transit',
        eta: new Date(data.eta),
        lastKnownLat: data.lastKnownLat || null,
        lastKnownLng: data.lastKnownLng || null
      }
    });

    res.status(201).json(shipment);
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing shipment
 */
export const updateShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const data: UpdateShipmentRequest = req.body;

    // Check if shipment exists
    const existingShipment = await prisma.shipment.findUnique({
      where: { id }
    });

    if (!existingShipment) {
      throw createError('Shipment not found', 404);
    }

    // Prepare update data
    const updateData: any = {};
    
    if (data.status) updateData.status = data.status;
    if (data.eta) updateData.eta = new Date(data.eta);
    if (data.lastKnownLat !== undefined) updateData.lastKnownLat = data.lastKnownLat;
    if (data.lastKnownLng !== undefined) updateData.lastKnownLng = data.lastKnownLng;

    // Update shipment
    const shipment = await prisma.shipment.update({
      where: { id },
      data: updateData
    });

    res.json(shipment);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a shipment
 */
export const deleteShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    // Check if shipment exists
    const existingShipment = await prisma.shipment.findUnique({
      where: { id }
    });

    if (!existingShipment) {
      throw createError('Shipment not found', 404);
    }

    // Delete shipment
    await prisma.shipment.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
