let deliveries = [];

function createDelivery(req, res) {
    const { orderId, address } = req.body;
    const delivery = {
        id: orderId,
        address,
        status: 'pending'
    };
    deliveries.push(delivery);
    res.status(201).json({ message: 'Delivery created', delivery });
}

function updateDeliveryStatus(req, res) {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    for (let i = 0; i < deliveries.length; i++) {
        if (deliveries[i].id === orderId) {
            deliveries[i].status = newStatus;
            return res.json({ message: 'Status updated', delivery: deliveries[i] });
        }
    }

    res.status(404).json({ error: 'Delivery not found' });
}

function getDelivery(req, res) {
    const { orderId } = req.params;
    const delivery = deliveries.find(d => d.id === orderId);
    if (delivery) {
        res.json(delivery);
    } else {
        res.status(404).json({ error: 'Delivery not found' });
    }
}

function listDeliveries(req, res) {
    res.json(deliveries);
}

module.exports = {
    createDelivery,
    updateDeliveryStatus,
    getDelivery,
    listDeliveries
};
