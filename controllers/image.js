const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '78a12b66e5d5407b88e211e1a7dd3ad2'
  });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))

}

const handleImage = (req, res, db) => {
    const {id, entry_count} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', entry_count)
            .returning('entries')
                .then(entries => {
                    res.json(entries[0]);
                }).catch(
                    err => res.status(400).json('unable to get entries')
                )
}

module.exports = {
    handleImage,
    handleApiCall
}

