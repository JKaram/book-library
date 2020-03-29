const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')



mongoose.connect('mongodb+srv://Jamie:1234@book-lookup-itjjp.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

const app = express();
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql:true
}))

app.listen(4000, () => {
    console.log('Now listening on port 4000');
});

