const Driver = require('../models/Driver');
const db = require('../config/db');

exports.registerDriver = (req, res) => {
    const files = req.files;
    const body = req.body;

    const documents = {
        driverPhoto: files.driverPhoto?.[0]?.filename || null,
        idDocument: files.idDocument?.[0]?.filename || null,
        inspectionReport: files.inspectionReport?.[0]?.filename || null,
        licensePrdp: files.licensePrdp?.[0]?.filename || null,
        criminalRecord: files.criminalRecord?.[0]?.filename || null,
    };

    const driver = new Driver({ ...body, documents });

    Driver.save(driver, db, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Driver Application submitted', id: result.insertId });
    });
};