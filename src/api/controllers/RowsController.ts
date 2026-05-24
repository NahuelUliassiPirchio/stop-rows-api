import RowsService from '../services/RowsService';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express';

const RowsController = {
    getAllRows: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const rows = await RowsService.getAllRows();
            res.status(200).json(rows);
        } catch (err) {
            next(err);
        }
    },
    getRowById: async (req: Request, res: Response, next: NextFunction) => {
        const { rowId } = req.params;
        try {
            const row = await RowsService.getRowById(rowId);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    addRow: async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        const { shopId } = req.params;
        try {
            const row = await RowsService.addRow(body, shopId);
            res.status(201).json(row);
        } catch (err) {
            next(err);
        }
    },
    resumeRow: async (req: Request, res: Response, next: NextFunction) => {
        const { shopId } = req.params;
        try {
            const row = await RowsService.resumeRow(shopId);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    stopRow: async (req: Request, res: Response, next: NextFunction) => {
        const { shopId } = req.params;
        try {
            const row = await RowsService.stopRow(shopId);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    updateRow: async (req: Request, res: Response, next: NextFunction) => {
        const { shopId } = req.params;
        const { body } = req;
        try {
            const row = await RowsService.updateRow(shopId, body);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    deleteRow: async (req: Request, res: Response, next: NextFunction) => {
        const { shopId } = req.params;
        try {
            const row = await RowsService.deleteRow(shopId);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    userJoinRow: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const { rowId } = req.params;
        try {
            const row = await RowsService.userJoinRow(rowId, req.user);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    userLeaveRow: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const { rowId } = req.params;
        try {
            const row = await RowsService.userLeaveRow(rowId, req.user);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
};

export default RowsController;