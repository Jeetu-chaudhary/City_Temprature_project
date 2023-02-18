const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app =express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    
      res.sendFile(__dirname+"/index.html");
    });





app.post("/",function(req,res){
    const city=req.body.cityname;
    const api_var="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c5600220c41ca25d45199a7d7d2fdfe8&units=metric";
    https.get(api_var,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const discript=weatherdata.weather[0].description;
            res.write("The weather condition is " +discript);
            res.write("The temprature of " +city+ " is " + temp );
            res.send();
          });

     });    

});



app.listen(3000,function(){
    console.log("aap aaj bhi college nhi gye ?");
});