const RowsService = require('../services/RowsService');

const RowsController = {
    getAllRows: async (req, res, next) => {
        try {
            const rows = await RowsService.getAllRows();
            res.status(200).json(rows);
        } catch (err) {
            next(err);
        }
    },
    getRowById: async (req, res, next) => {
        const { rowId } = req.params;
        try {
            const row = await RowsService.getRowById(rowId);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    addRow: async (req, res, next) => {
        const { body } = req;
        const { shopId } = req.params;
        try {
            const row = await RowsService.addRow(body, shopId);
            res.status(201).json(row);
        } catch (err) {
            next(err);
        }
    },
    resumeRow: async (req, res, next) => {
        const { shopId } = req.params;
        try {
            const row = await RowsService.resumeRow(shopId);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    stopRow: async (req, res, next) => {
        const { shopId } = req.params;
        try {
            const row = await RowsService.stopRow(shopId);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    updateRow: async (req, res, next) => {
        const { shopId } = req.params;
        const { body } = req;
        try {
            const row = await RowsService.updateRow(shopId, body);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    deleteRow: async (req, res, next) => {
        const { shopId } = req.params;
        try {
            const row = await RowsService.deleteRow(shopId);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    userJoinRow: async (req, res, next) => {
        const { rowId } = req.params;
        try {
            const row = await RowsService.userJoinRow(rowId, req.user);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
    userLeaveRow: async (req, res, next) => {
        const { rowId } = req.params;
        try {
            const row = await RowsService.userLeaveRow(rowId, req.user);
            res.status(200).json(row);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = RowsController;