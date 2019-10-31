var paymentModule = require('iota-payment')
var express = require('express')
var app = express()
var cors = require('cors')
var { PythonShell } = require('python-shell')

var PYTHON_PATH = process.env.PYTHON_PATH
var PORT = process.env.PORT

app.use(cors())
var options = {
    mount: '/payments',
    value: 1,
    websockets: true
    // ...
}


app.use('/', express.static('frontend/dist'));


let server = paymentModule.createServer(app, options)

// Start server with iota-payment module on '/'
server.listen(PORT, function () {
    console.log(`Server started on http://localhost:${PORT} `)
})


//Create an event handler which is called, when a payment was successfull
var onPaymentSuccess = function (payment, order) {
    console.log('payment success!', payment, order);
    let command = payment.txInfo.message
    var validCommands = ["left", "right", "top", "down"]
    if (validCommands.indexOf(command) > -1) {
        //In the array!
        runScript(command)
    } else {
        //Not in the array
        console.log("No command! User typed: ", command);
    }
}

//Assign the event handler to the events:
paymentModule.on('paymentSuccess', onPaymentSuccess);


const runScript = (name) => {

    let optionsPython = {
        mode: 'text',
        pythonPath: PYTHON_PATH,
        args: ['value1']
    };

    var path = './scripts/' + name + '.py'
    PythonShell.run(path, optionsPython, function (err, results) {
        if (err) throw err;

        console.log('results show_ball: %j', results);

    });
}