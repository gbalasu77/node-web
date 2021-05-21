const express = require('express');
const path = require('path');
const hbs = require('hbs');

const request = require('postman-request');
const geocode = require('./utils/geocode.js');
const forcast = require('./utils/forecast');
const { response } = require('express');
const { errorMonitor } = require('events');

//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));

const app = express();


//define paths for Express config
const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
//console.log(viewsPath);

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDir));

app.get('',(req,res)=>{
    res.render('index',
    {
        title:'Weather App',
        name:'Suthan Bala'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Suthan Bala'
    });
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        helpMessage:'This page display all helpful instruction.',
        name:'Suthan Bala'
    })
})

app.get('/product',(req,res)=>{
    console.log(req.query.search);
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})
// app.get('',(req,res)=>{

//     //res.send("hello Node");
//     res.send('<h1>Welcome</h1>')
// })

// app.get('/help',(req,res)=>{
//    // res.send('Help Page...')

//    res.send(
//        {
//            name:'Suthan Bala',
//            title:'Developer'
//        }
//    )
// })

// app.get('/about',(req,res)=>{
//     //res.send('About US Page...')
//     res.send('<h1>About Us</h1>')
// })

app.get('/weather',(req,res)=>{
    //res.send('Your local weather is coming up...')
    
    if(!req.query.address){
        return res.send({
            error:"You must provide and address"
        })
    }

    geocode(req.query.address,(error,response,body)=>{
        if(error){
            return res.send({
                error:"error occured with Weather API"
            })
        
        }
        else if(response.body.features === undefined){
            return res.send({
                error:"No location found. This is not a valid location"
            })
            
        }
        else{
            const webData = response.body;            
           
            //console.log("Longitute: "+ webData.features[0].center[0]+" Lattitude: " +webData.features[0].center[1]);

        
            forcast( webData.features[0].center[0],webData.features[0].center[1],(error,response,body)=>{
                if(error){
                   return res.send({
                       error:"Error occured while getting weather data"
                   })
                }        
                //console.log(response);                
                // console.log("Current Temperature is " + response.body.current.temperature +' but feels like ' + response.body.current.feelslike);

                const{temperature,feelslike} = response.body.current; //another way of doing this - object destructor
                //console.log("Current Temperature is " + temperature +' but feels like ' + feelslike);
                return res.send({
                    CurrentTemperature:temperature,
                    feelslike:feelslike
                })
            })
        }

    })    

   /* res.send(
        {
            location:'Toronto',
            weather:'warm',
            address:req.query.address
        }
    )
    */
})

app.get('/help/*',(req,res)=>{
    //res.send('Help article not found');
    res.render('error',{
        title:'Help',
        errorMessage:'Help article not found',
        name:'Suthan Bala'
    })
})

app.get('*',(req,res)=>{

    //res.send('My 404 Page.')
    res.render('error',{
        title:'Page not Found',
        errorMessage:'resource not found',
        name:'Suthan Bala'
    })
});


app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})