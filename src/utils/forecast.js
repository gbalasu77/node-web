const request = require('postman-request');

const forcast = (lati,longi,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=0fa0a5f5b4190ebba2750be71fe281b1&query='+longi+','+ lati+'';

    request({url:url,json:true},(error,response,body)=>{
        callback(error,response,body);
       
    })
    

    
}

module.exports =forcast;