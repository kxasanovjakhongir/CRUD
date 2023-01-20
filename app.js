let express=require('express')
let Joi=require('joi')
let app=express()
app.use(express.json())
let port=process.env.PORT || 5000

let catagories=[
    {id:1,name:'Javascript basic'}
]
// ________________________ Function VALIDATE ___________________
function validate(course){
    let valid= Joi.object({
        name:Joi.string().required().min(3)
        
    })
    return valid.validate(course)
}

// ________________________ GET ________________________

app.get('/api/catagories',(req,res)=>{
    res.send(catagories)
})

app.get('/api/catagories/:id',(req,res)=>{
    let lesson=catagories.find(a=>a.id===parseInt(req.params.id))
    if(!lesson) return res.status(404).send(`${req.params.id} id li vertual kurs mavjud emas !`)
    else res.send(catagories)
})

// ________________________ POST ________________________

app.post('/api/catagories',(req,res)=>{
    let {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let catagories_2={
        id:catagories.length+1,
        name: req.body.name
    }
    
    catagories.push(catagories_2)
    res.status(201).send(catagories)
})


// ____________________________ PUT ______________________

app.put('/api/catagories/:id',(req,res)=>{
    let lesson=catagories.find(a=>a.id===parseInt(req.params.id))
    if(!lesson) return res.status(404).send(`${req.params.id} id li vertual kurs mavjud emas !`)

    let {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    lesson.name=req.body.name
    res.send(lesson)
})
// ________________________ Delete __________________________

app.delete('/api/catagories/:id',(req,res)=>{
    let lesson=catagories.find(a=>a.id===parseInt(req.params.id))
    if(!lesson) return res.status(404).send(`${req.params.id} id li vertual kurs mavjud emas !`)

    let lessonID=catagories.indexOf(lesson)
    catagories.splice(lessonID,1)
    res.send(catagories)
})
           
// __________________________ SERVER ________________________

app.listen(port,()=>{
    console.log(`--- ${port} ---> online ...`);
})