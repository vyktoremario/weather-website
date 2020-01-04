const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/301cc1cf6eb0c607c15194eebec40e2a/' + latitude +','+ longitude +'?units=si'
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find Location!', undefined)
        } else {
            const info = body.currently
            callback(undefined, `${body.daily.data[0].summary}. It is currently ${info.temperature} degrees out. there is a ${info.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast