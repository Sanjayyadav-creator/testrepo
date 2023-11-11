const express = require('express')
const uuid = require('uuid')
const employess = require('./employee')


const app = express()


const middleware = (req,res,next) =>{
    let date = new Date()
    console.log("date",date)
    next()
}


app.use(middleware)//Custom Middleware
app.use(express.json()) 

//Read Operation
app.get("/users",(req,res) =>{
    res.status(200).json(employess)
})


//Read Operation
app.get("/user/:data",(req,res) =>{
    const found = employess.some(emp => emp.name == req.params.data)
    if(found){
        const employee = employess.filter(emp => emp.name === req.params.data)
        res.status(200).json(employee[0])
    }else{
        res.status(400).json({msg:`No member found with name of ${req.params.data}`})
    }
})

//Delete Operation
app.delete("/user/:id",(req,res) =>{
    let id = req.params.id
    const found = employess.some(emp => emp.id === +id)
    if(found){
        const newEmployess = employess.filter(emp => emp.id !== +id)
        res.status(200).json(newEmployess)
    }else{
    res.status(400).json({msg:`No member found with id of ${id}`})
    }
})

//Create Operation
app.post("/user",(req,res) =>{
    let userObj = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email
    }
    employess.push(userObj)
    res.status(200).json(employess)
})

//Update Operation
app.put("/user/:id",(req,res) =>{
    let id = req.params.id
    const found = employess.some(emp => emp.id === +id)
    if(found){
      const result =   employess.map(emp =>{
        if(emp.id === +id){
            emp.name = req.body.name;
            emp.email = req.body.email
        }
        return emp
      })
      res.status(200).json(result)
    }else{
        res.status(400).json({msg:`No member found with id of ${id}`})
    }
})




// app.get("/",(req,res) =>{
//     res.end("<h1>Hello</h1>")
// })

// app.get("/test",(req,res) =>{
//     res.end("<h1>Hello test user</h1>")
// })


const PORT = 3000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))