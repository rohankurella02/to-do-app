const express = require('express');
const app = express();
const db = require('./models');

//importing Modules
const { Task } = require('./models');


app.use(express.json());




app.get('/', (req, res) => {
    res.send('Hello World!')
})

//route to insert a new task
app.post('/insertTask', (req, res) => {
    console.log(req.body)
    Task.create(req.body)
    .catch((err) => {
        res.send("Error Occurred")
    })
    res.send("Created Successfully")
})

//route to get all tasks
app.get('/getTasks', (req, res) => {
    Task.findAll()
    .then((tasks) => res.send(tasks))
    .catch((err) => res.send("Error Occurred"))

})

//route to delete a task
app.delete('/deleteTask/:id', (req, res) => {
    Task.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((task) => res.send("Deleted Successfully"))
    .catch((err) => res.send("Error Occurred"));
})

//route to update a task
app.put('/updateTask/:id', (req, res) => {
    //get id from url
    const id = req.params.id;
    //get updated task from request body
    const updatedTask = req.body;
    //find task by id and update it
    Task.update(updatedTask, {where: {id: id}})
    .then(() => res.send("Updated Successfully"))
    .catch((err) => res.send("Error Occurred"))
})

//Initialize Database
db.sequelize.sync().then((req) => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
})








