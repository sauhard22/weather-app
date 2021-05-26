const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')

const app = express()
const port = process.env.PORT || 3000

//Degfine paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))
 
app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Sauhard Srivastava'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Sauhard Srivastava'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        help : 'This is some helpful text',
        title: 'Help',
        name: 'Sauhard Srivastava'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You Must Ptovide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Allahabad',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {

    if(!req.query.search) {  
       return res.send({
            error: 'You must provide a search term '
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: ' Sauhard Srivastva',
        errorMessage: 'Help Article Not Found.'
    })
})


app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Sauhard Srivastav',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})