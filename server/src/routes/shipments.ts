import { Router } from 'express';
import {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment
} from '../controllers/shipmentsController';
import {
  validateCreateShipment,
  validateUpdateShipment,
  validateShipmentId
} from '../middleware/validate';

const router = Router();

/**
 * @route GET /api/shipments
 * @desc Get all shipments with optional search and filtering
 * @query search - Search term for container ID, origin, or destination
 * @query status - Filter by shipment status
 * @query limit - Number of records to return (max 100, default 50)
 * @query offset - Number of records to skip (for pagination)
 */
router.get('/', getShipments);

/**
 * @route GET /api/shipments/:id
 * @desc Get a single shipment by ID
 * @param id - Shipment ID
 */
router.get('/:id', validateShipmentId, getShipmentById);

/**
 * @route POST /api/shipments
 * @desc Create a new shipment
 * @body CreateShipmentRequest
 */
router.post('/', validateCreateShipment, createShipment);

/**
 * @route PUT /api/shipments/:id
 * @desc Update an existing shipment
 * @param id - Shipment ID
 * @body UpdateShipmentRequest
 */
router.put('/:id', validateShipmentId, validateUpdateShipment, updateShipment);

/**
 * @route DELETE /api/shipments/:id
 * @desc Delete a shipment
 * @param id - Shipment ID
 */
router.delete('/:id', validateShipmentId, deleteShipment);

export default router;
