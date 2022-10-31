const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple Node Server Running')
});

app.use(cors());//middleWire cors
app.use(express.json());//middleWire cors



const users = [
    { id: 1, name: 'sabana', email: 'sabana@gmail.com' },
    { id: 1, name: 'sabnoor', email: 'sabnoor@gmail.com' },
    { id: 1, name: 'saban', email: 'saban@gmail.com' },
]

//post-------
// app.post('/users', (req, res) => {
//     console.log('post api called')
//     const user = req.body; //assign input field data
//     user.id = users.length + 1; // users update
//     users.push(user); // push new data
//     console.log(user);
//     res.send(user);
// })


//MongoDB

const uri = "mongodb+srv://dbUserR001:scJwQiL6VcwBOZX2@cluster0.nfiuyyd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simple-node').collection('users')
        // const user = { name: 'Moyia Mia', email: 'moyina@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(result)



        //get part
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({})
            const users = await cursor.toArray()
            res.send(users)
        })





        //post part
        app.post('/users', async (req, res) => {
            console.log('post api called')
            const user = req.body; //assign input field data
            //user.id = users.length + 1; // users update
            //users.push(user); // push new data
            //console.log(user);
            const result = await userCollection.insertOne(user)
            console.log(result)
            user._id = result.insertedId
            res.send(user);
        })
    }
    finally {

    }
}


run().catch(err => console.log(err))









// client.connect(err => {
//     const collection = client.db("simple-node").collection("users");
//     // perform actions on the collection object
//     console.log('DB connect')
//     client.close();
// });


//---end MongoDB




//get-------
// app.get('/users', (req, res) => {
//     console.log(req.query)// query part
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
//         res.send(filtered)
//     }
//     else {
//         res.send(users);
//     }
// })

app.listen(port, () => {
    console.log(`simple server is running on port ${port}`);
})