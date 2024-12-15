const express = require('express');
const multer = require('multer');
const router = express.Router();

// Adding multer 
const upload = multer({ dest: 'uploads/' });

// POST route for handling quote requests
router.post('/', upload.array('images'), async (req, res) => {
    const { clientId, propertyAddress, squareFeet, proposedPrice, note } = req.body;

    // Validate required fields
    if (!clientId || !propertyAddress || !squareFeet || !proposedPrice) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate file uploads
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'At least one image must be uploaded' });
    }

    try {
        console.log('Quote request received:', req.body);
        console.log('Uploaded files:', req.files);

        // Placeholder for further processing (e.g., saving to a database)
        res.status(201).json({ message: 'Quote request submitted successfully' });
    } catch (error) {
        console.error('Error processing quote request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/// Test 
router.post('/', async (req, res) => {
    const { clientId, propertyAddress, squareFeet, proposedPrice } = req.body;

    if (!clientId || !propertyAddress || !squareFeet || !proposedPrice || !note) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const status = 'PENDING'; // Default status
    const query = `
        INSERT INTO Quotes (clientId, propertyAddress, squareFeet, proposedPrice, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.execute(query, [
            clientId,
            propertyAddress,
            squareFeet,
            proposedPrice,
            status
        ]);
        res.status(201).json({ message: 'Quote created successfully', quoteId: result.insertId });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
