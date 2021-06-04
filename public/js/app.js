//console.log('Client side js file is loaded.');

//const { response } = require("express");


/*
fetch('http://puzzle.mead.io/puzzle').then((Response)=>{

Response.json().then((data)=>{
    console.log(data)
})

})

fetch('http://api.weatherstack.com/current?access_key=0fa0a5f5b4190ebba2750be71fe281b1&query=Markham').then((Response)=>{
    Response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data);
        }       
    })
})

*/

const weatherform = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherform.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;

    if(!location){
        console.log('You must provide a location.')
        messageOne.textContent ='You must provide a location';
        messageTwo.textContent = '';
    }else{

    messageOne.textContent ='Loading.....';
    messageTwo.textContent = '';
   
   /* fetch('http://api.weatherstack.com/current?access_key=0fa0a5f5b4190ebba2750be71fe281b1&query='+location).then((Response)=>{
        Response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageOne.textContent='Provide another location.....';
                messageTwo.textContent = '';
            }else{
                console.log(data);
                messageOne.textContent='Current weather for your location: ' + location;
                messageTwo.textContent = 'Temperature: '+data.current.temperature;
                messageTwo.textContent+=' Location: '+ location;
            }       
        })*/

        
        
    fetch('/weather?address='+location).then((Response)=>{
        Response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageOne.textContent='Provide another location.....';
                messageTwo.textContent = '';
            }else{
                console.log(data);
                messageOne.textContent='Current weather for your location: ' + location;
                messageTwo.textContent = 'Temperature: '+data.CurrentTemperature;
                messageTwo.textContent+=' Feels like: '+ data.feelslike;
            }       
        })
        

        /*fetch('http://localhost:3000/weather?address='+location.then((Response)=>{
            Response.json().then((data)=>{
                if(data.error){
                    console.log(data.error);
                    messageOne.textContent='Provide another location.....';
                    messageTwo.textContent = '';
                }else{
                    console.log(data);
                    messageOne.textContent='Current weather for your location: ' + location;
                   // messageTwo.textContent = 'Temperature: '+data.current.temperature;
                   // messageTwo.textContent+=' Location: '+ location;
                }       
            })*/
    })
}    
    console.log(location);
})
