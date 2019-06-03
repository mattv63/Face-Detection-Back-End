const handleRankings = (req, res, db) => {
    db.select('name', 'entries').from('users').orderBy('entries', 'desc')
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {
    handleRankings
}