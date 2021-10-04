const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

client.set('visits', 0);

app.get('/', function(req, res) {
    client.get('visits',function(err, visits) {
        res.status(200).send('Number of visits' + visits);
        client.set('visits',parseInt(visits) + 1);
    });
});


app.listen(8081,function() {
    console.log('Http is Listening on 8081')
});
