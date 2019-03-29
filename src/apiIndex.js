const
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    api = require('./api/api.js');
    //fetch = require('node-fetch');

app.set('port', 3001);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.listen(app.get('port'), console.log('Servicio Api iniciado...'));

