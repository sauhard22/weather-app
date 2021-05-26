const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=711d0dd15f62de9a987d284697077251&query=' + latitude+ ',' + longitude  + '%20&units=f'
    request({ url, json:true}, (error,{ body })=>{
        if(error){
            callback('Unable to connect', undefined)
        }
        else if(body.error){
            callback('Enter a valid locaton', undefined)
        }
        else{
            callback(undefined, `It's ${body.current.temperature}F outside`)      
        }
    })
} 

module.exports = forecast