import express from 'express';
import mongoose from 'mongoose';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import userPost from './Routes/Post.js';
import userCat from './Routes/Categories.js';
import multer from 'multer';
import cors from 'cors'

const app = express();
app.use(express.json());
const PORT = 5000;

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images");
    },
        filename:(req,file,cb) =>{
            cb(null,"hello.jpg");
        },
    
});

const upload = multer({storage:storage}); 
app.post('/api/upload', upload.single('file'), (req,res) =>{
    res.status(200).json("File has been uploaded");
})

app.use(cors());
app.use('/api/auth',authRoute);
app.use('/api/posts',userPost);
app.use('/api/users',userRoute);
app.use('/api/category',userCat) 

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
const URL = 'mongodb+srv://ClaraGarcia:LoLe2001@cluster0.twsxh.mongodb.net/Cluster0?retryWrites=true&w=majority';
mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex: true,
}) .then(console.log("backend is running"));

app.listen(PORT,()=>{
    console.log("Server is running");
})