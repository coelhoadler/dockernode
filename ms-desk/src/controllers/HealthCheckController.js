module.exports = {
    async health(req, res) {
        return res.json({ status: true });
    }
}