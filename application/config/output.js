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
        var post = req.body;

        //DATABASE QUERY*
        var database = {
            query: req.query
        }

        let arr_profiler = [url, session, headers, post, database]
        let profiler = this.display_profiler(arr_profiler);
        console.log(profiler);

        return arr_profiler;

    }

    display_profiler(arr){
        var output = '';
        for(var i=0; i<arr.length; i++){
            //for each object create a row 
            output += "<div class='profiler>";
            //input for each object
                for(const property in arr[i]){
                    output += `<p>${property}: ${arr[i][property]}`
                }
            output += "</div";
        }
        return output;
    }

}

let output = new Output;

module.exports = output;