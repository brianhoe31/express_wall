class Output { 
    enable_profiler(req, res){
        //URI
        var url = {
            URI: req.url
        }
        
        //SESSION DATA 
        var session = {
            id: req.session.id,
            userID: req.session.userId,
            ip: req.ip
        }

        //HTP HEADERS
        var headers = {
            HTTP_ACCEPT: req.headers.accept,
            HTTP_CONNECTION: req.headers.connection,
            HOST: req.headers.host,
            REFERER: req.headers.referer,
            SERVER_NAME: req.host
        }
        
        //POST DATA*
        if(req.body){
            console.log('req.body is :', req.body.password);
        }
        //DATABASE QUERY*
        return [url, session, headers];
    }
}

let output = new Output;

module.exports = output;