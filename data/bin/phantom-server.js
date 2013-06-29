var TIMEOUT = 1 * 60 * 1000,
    port, server, service, timer = null
    system = require('system'),
    wp = require('webpage'),

    onOpenShift = !!system.env['OPENSHIFT_REPO_DIR']
;

function exit(){
    console.log('PhantomJS timeout');
    phantom.exit()
}

timer = setTimeout(exit, TIMEOUT)
port = 8888
baseURL = onOpenShift ? "http://vigyazomedvebocsokaholdon-clavius.rhcloud.com/" : 'http://localhost:8000'
server = require('webserver').create();

service = server.listen(port, function (request, response) {
    if (timer){
        clearTimeout(timer)
    }
    timer = setTimeout(exit, TIMEOUT)
    console.log('[ PhantomJS Request at - ' + new Date() + ' - url: ' + request.url);

    var page = wp.create();
    page.open(baseURL + request.url, function () {
        response.statusCode = 200;
        response.headers = {
            'Cache': 'no-cache',
            'Content-Type': 'text/html'
        };
        response.write(page.content);
        response.close();
        console.log('Phatom OK')
    });

});

if (service) {
    console.log('Web server running on port ' + port);
    console.log(' and call: ' + baseURL);

} else {
    console.log('Error: Could not create web server listening on port ' + port);
    exit()
}
