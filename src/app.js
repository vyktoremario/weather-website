const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Code-Mario'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Code-Mario'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Code-Mario',
        helpMessage: 'This is some help text!'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an Address'
        })
    }

    geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(longitude, latitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Code-Mario',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => [
    res.render('404', {
        title: '404 page',
        name: 'Code-Mario',
        errorMessage: 'Page not found'
    })
])


app.listen(3000, () => {
    console.log('Server is up on 3000')
})