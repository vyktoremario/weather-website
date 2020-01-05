const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/301cc1cf6eb0c607c15194eebec40e2a/' + latitude +','+ longitude +'?units=si'
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find Location!', undefined)
        } else {
            // console.log(body.daily)
            const info = body.currently
            callback(undefined, `${body.daily.data[0].summary}. It is currently ${info.temperature} degrees out. The highest temperature for the day is ${body.daily.data[0].temperatureHigh} degrees, and the lowest temperature for the day is ${body.daily.data[0].temperatureLow} degrees. There is a ${info.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast