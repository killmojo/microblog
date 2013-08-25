/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path');

var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');

var app = express();

// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(flash());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: settings.cookieSecret,
		store: new MongoStore({
			db: settings.db
		})
	}));

	app.use(app.router);
	//app.use(express.router(routes));
	app.use(express.static(path.join(__dirname, 'public')));

});

routes(app);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);
// app.get('/u:user', routes.user);
// app.post('/post', routes.post);
// app.get('/reg', routes.reg);
// app.post('/reg', routes.doReg);
// app.get('/login', routes.login);
// app.post('/login', routes.doLogin);
// app.get('/logout', routes.logout);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});



//./mongod --dbpath=/Users/yaoyao/Developer/mongodb/mongodb-osx-x86_64-2.4.5/data/db


///supervisor
// 进入调试状态
// node --debug-brk test.js
// 这是可以看到这么一句话”debugger listening on port 5858”光标在下一行待命 现在就已经做好了调试前的准备

// 启动node-inspector
// 启动node-inspector可以在任何目录 因为之前安装时已经加了-g的参数 而node-inspector与当前目录并没有什么直接联系 它会直接去链接刚才进入调试的5858端口

// node-inspector &

// liof -i:8080  || netstat -ano|findstr 8888 
// 然后kill掉这个进程

// kill -9 <NODE_PID>
// 再次启动node-inspector就可以啦

// node-inspector &