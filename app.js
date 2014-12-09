
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , stylus = require('stylus')
  , nib = require('nib')
  , fs = require('fs')
  , moment = require('moment')
  , url = require('url')
  , crypto = require('crypto')
  , http = require('http');
  
// console.log(req.body); var crypto = require('crypto');

var anytaxis = require('./routes/anytaxis');
//console.log(typeof tools.foo); // => 'function'
//console.log(typeof tools.bar); // => 'function'
//console.log(typeof tools.zemba); // => undefined

var app = express();
//var app = module.exports = express.createServer(form({ keepExtensions: true, uploadDir:'./uploads' }));

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.configure(function(){
  app.set('port', process.env.PORT || 3031);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.post('/anytaxis22', function(req, res) {
  console.log("anytaxis22 you wrote");
  //console.log(req.params);
  console.log(req.body);
  console.log(JSON.stringify(req.body));

  var queryObject = url.parse(req.url,true).query;
  console.log(queryObject);
  console.log("----- "+ url.format(queryObject));
  
  //console.log("--qobj -- "+ JSON.stringify(queryObject) );
  var data = req.body.data;
  var obj  = JSON.parse(data);
  
  console.log(obj);
  console.log("obj.loc "+ obj.loc );
  console.log("obj.id "+ obj.id );
  console.log("obj.to "+ obj.to );
  var results = anytaxis.foo11(res, data);

  res.send(JSON.stringify(req.body));
});

app.put('/anytaxi/:id', function (req, res) {
  console.log('anytaxi a function in another .js file.');
  var results = anytaxis.foo22(res, data);
  console.log('what you sent ('+req.params.id) + ')';
  
  //res.type('jpg');
  res.contentType = 'image/jpg';
  res.attachment('./images/image.jpg');

  res.send('FM put '  + 'LLLLLLL');
});


app.post('/anytaxis', function (req, res) {
  console.log('Call a function in another .js file.');
  //var results = anytaxis.foo22(res);
  console.log("results("+ results + ")");

  res.type('jpg');
  res.contentType = 'image/jpg';
  res.attachment('/images/image.jpg');

  res.send('FM user ' + results + 'LLLLLLL');
  //next();
});

app.get('/anytaxis11', function (req, res) {
  console.log('Call a function in another .js file.');
  var results = anytaxis.foo11(res);
  console.log("results("+ results + ")");
  //res.send('FM user ' + results + 'LLLLLLL');
  //next();
});

app.get('/guid/:id', function (req, res) {
  console.log('Call a function in another .js file.');
  var results = "wtf is a guid";
  var date = new Date().toUTCString();
  var method = "GET";
  var type = "";
  var len = "";
  var str = method + ",," + type + "," + len + "," + date;
  var cred_userid="b1394ae3-5216-43b0-abef-32ee4dee615d";

  console.log("str = " + str);

  seckey = req.params.id;
   console.log(seckey);
  var seckeyBytes = new Buffer(seckey.replace(/-/g, ''), 'hex');
  console.log("seckeyBytes = " + seckeyBytes);
  
  var userIdBytes = new Buffer(cred_userid.replace(/-/g, ''), 'hex');
console.log("userIdBytes = " + userIdBytes);
  //console.log("length = " + userIdBytes.length);
  //console.log("userIdBytes[] = " + userIdBytes);
  //console.log("userIdBytes[0] = " + userIdBytes[0]);
   //console.log("userIdBytes[1] = " + userIdBytes[1]);

  console.log("base64 = "+ userIdBytes.toString('base64'));
  //console.log(seckeyBytes[0]);
  //console.log("results("+ seckeyBytes + ")");
  var hmac = crypto.createHmac('sha1', seckeyBytes);
  var sig = hmac.update(str).digest();

  console.log("sigBase64    = "+ sig.toString('base64'));
  console.log("userIdBase64 = "+ userIdBytes.toString('base64'));

var auth = userIdBytes.toString('base64') + ':' + sig.toString('base64');
console.log("auth = " + auth);
console.log('Authorization' + ':' + 'TRGN ' + auth);

   res.send('FM user ' + req.params.id);
  //res.send('FM user ' + results + 'LLLLLLL');  
  //next();
});

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});


app.get('/bobo/user/:id', function(req, res) {
    res.send('FM user ' + req.params.id);
});


app.get('/TestGallery/oddballs.xml', function(req, res) {
    res.send('FM user ' + req.params.id);
});

var fingerprint = "hmac_md5_hex($loginID .";// "^" . $sequence . "^" . $timeStamp . "^" . $amount . "^", $transactionKey);

//https://code.google.com/p/crypto-js/
function myFingerprint()
{/*
  var hashlib = require('hashlib');

  console.log("myFingerprint()");
  var md5er = crypto.createHash('md5');
md5er.update('something');
md5er.digest('hex');

console.log(md5er); 
*/

var hmacer = crypto.createHmac('sha1', 'key');
hmacer.update('something');
hmacer.digest('hex');

console.log(hmacer);
console.log('----------------------');
var SHA256 = require("crypto-js/sha256");
console.log(SHA256("Message"));
console.log('======================');
}

app.post('/simMethod', function(req, res) {
  myFingerprint();

    console.log(req.body);
    console.log(JSON.stringify(req.body));
    
    var request = require('request');

//http://www.joeschedule.com/cgi-bin/each.pl?bob=you

  //var  url  = "https://test.authorize.net/gateway/transact.dll";
  var  url  = "http://joeschedule.com/cgi-bin/each.pl";
// using needle begin
var needle = require('needle');
//needle.post('http://joeschedule.com/cgi-bin/each.pl', {foo:'bar', x_description:"description"}, 
//needle.post('http://joeschedule.com/cgi-bin/each.pl',  JSON.parse(JSON.stringify(req.body)) ,  

  //var jjj = JSON.stringify(req.body + {"fff":"you"}) ;//+ ',"fff":"you"';
  //var jjj =req.body 
  var jjj = JSON.stringify(req.body) ;
  var body22 = JSON.parse(jjj);
  body22["x_fp_hash"] = fingerprint;
  body22["x_fp_hash22"] = "you22";
  body22["x_fp_hash22"] = "you33";
  console.log(JSON.stringify(body22) );
  //jjj.push({"x_fp_hash":"you"});
  console.log(JSON.stringify(jjj) );
  //needle.post(url,  JSON.parse(JSON.stringify(req.body)) ,  
  //needle.post(url,  JSON.parse(JSON.stringify(req.body)) ,
  //needle.post(url,  JSON.parse(JSON.stringify(jjj)) ,
  //needle.post(url,  JSON.parse(jjj) ,
  needle.post(url,  JSON.parse(JSON.stringify(body22)) ,
    function(err, resp, body){
        console.log(body);
        res.send((body));
        //res.send(JSON.stringify(body));  

});

return;
// using needle end

/**

    request.post(
    'http://www.joeschedule.com/cgi-bin/each.pl?f=u',
    //{ form: { key: 'value' } },
    
    { form: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
    ******/

    //res.end("waht you wrote"); 
    //console.log(req.params.size);
    //res.send('your email ' + req.body.email);
    res.send(JSON.stringify(req.body));
});


app.post('/each', function(req, res) {
  console.log("waht you wrote");
  //console.log(req.params);
  console.log(req.body);
  console.log(JSON.stringify(req.body));

  var queryObject = url.parse(req.url,true).query;
  console.log(queryObject);
  console.log("----- "+ url.format(queryObject));
  console.log("--guery -- "+ JSON.stringify(url.parse(req.url,true).query) );
  console.log("--qobj -- "+ JSON.stringify(queryObject) );


  // write to file.

//var fs = require('fs
  var target_path = __dirname + "/uploads/" + "postData.txt";
  var stream = fs.createWriteStream(target_path,
{ flags: 'a+',
  encoding: null,
  mode: 0666 }
    );
  stream.once('open', function(fd) {
    //var day=dateFormat(result.req, "yyyy-mm-dd h:MM:ss");
    //var moment = require('moment');
    //console.log(moment().format());
    
    //console.log(moment().format("MMM Do YY"));                         

    stream.write(moment().format() + " ");
    stream.write("waht you wrote\n");

var isEmpty = Object.keys(queryObject).length === 0;
    if (!isEmpty )
    {
          stream.write(JSON.stringify(queryObject));
    stream.write("\n");

    }

    
    stream.write(JSON.stringify(req.body));
    stream.write("\n");
    stream.end();
    });



    //fs = require('fs');
    /*
fs.writeFile(target_path, 'Hello World!', function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});
*/

    //res.end("waht you wrote"); 
    //console.log(req.params.size);
    //res.send('your email ' + req.body.email);
    res.send(JSON.stringify(req.body));
});

app.post('/signup', function(req, res) {
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    //res.end("waht you wrote"); 
    //console.log(req.params.size);
    //res.send('your email ' + req.body.email);
    res.send(JSON.stringify(req.body));
});

app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);

    var tmp_path = req.files.thumbnail.path;
    var target_path = __dirname + "/uploads/" + req.files.thumbnail.name;

    console.log('=====================');
    console.log(tmp_path);
    console.log(target_path);
    console.log(req.files.thumbnail.name);

    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });

    //res.end("upload complete");   
});

/*
fs.readFile(req.files.displayImage.path, function (err, data) {
  // ...
  var newPath = __dirname + "/uploads/uploadedFileName";
  fs.writeFile(newPath, data, function (err) {
    res.redirect("back");
  });
});
*/


http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});


