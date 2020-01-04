const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoidnlrdG9yZW1hcmlvIiwiYSI6ImNrNGRqb3hhdDAzZ2gzZWxocm1jbHg3b2wifQ.QXo5pJ7hhoxGwLO3nank_g&limit=1'
    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('We cannot find location. Check details and try again.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode