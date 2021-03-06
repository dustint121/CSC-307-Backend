const express = require('express');
const app = express();
const port = 5000;



const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 


app.use(express.json());

//Part 1
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Part2
app.get('/users', (req, res) => {
    res.send(users);
});


//Part 4
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}


// Part 5
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found looking for id.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}


//Part 6
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}




//Part 7


app.get('/users/:name:job', (req, res) => {
    const name = req.params['name']; //or req.params.id
    const job = req.params['job'];
    let result = findUserByNameandJob(name, job);
    if (result === undefined || result.length == 0)
        res.status(404).send(job)//('Resource not found looking for name and job.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


const findUserByJob = (job,list) => {
    return list.filter((user) => user['job'] === job);
}

const findUserByNameandJob = (name, job) => {
    return findUserByJob(job, findUserByName(name));
}





function removeUserById(id) {
    index = users['users_list'].indexOf(findUserById(id));
    if(index != -1)
        return users['users_list'].splice(index , 1); 
    return
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = removeUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    res.status(204).end();
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 