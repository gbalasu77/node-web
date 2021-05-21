const request = require('postman-request');

const geocode = (address,callback) =>{
    const encodedURL = encodeURI(address);
    const mapAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedURL}.json?access_token=pk.eyJ1IjoiZ2JhbGFzdSIsImEiOiJja2lxOXF6dHkxYW5iMzFvOGduZjlsdXVxIn0.Ca4tJWweeWJ8eO7eKgFHLg&limit=1`
    request({url:mapAPI,json:true},(error,response,body)=>{
        callback(error,response,body)
    })

   // callback(mapAPI);
}

module.exports = geocode;