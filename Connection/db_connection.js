const mongoose=require('mongoose')
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('MongoDb connected');
}).catch(()=>{
    console.log('MongoDb is not connected');
})