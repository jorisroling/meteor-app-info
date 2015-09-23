var exec = Npm.require('child_process').exec;

function _command(cmd, cb) {
	exec(cmd, function(err, stdout, stderr) {
		cb(err||stderr,stdout.split('\n').join(''));
	})
}

function _date(date) {
	return ("0" + (date.getDate() + 1)).slice(-2) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' +date.getFullYear() + ' ' +("0" + date.getHours()).slice(-2) + ':' +("0" + date.getMinutes()).slice(-2) + ':' +("0" + date.getSeconds()).slice(-2);
}

var handler = function (compileStep) {
	var info={build:_date(new Date)};
	var cmds=[
		{name: 'tag',cmd: 'git describe --always --tag --abbrev=0'},
		{name: 'author',cmd: 'git log --no-color -n 1 --pretty=format:"%an"'},
		{name: 'date',cmd: 'git log --no-color -n 1 --pretty=format:"%ad"'},
		{name: 'branch',cmd: 'git rev-parse --abbrev-ref HEAD'},
		{name: 'short',cmd: 'git rev-parse --short HEAD'},
		{name: 'long',cmd: 'git rev-parse HEAD'},
	];
	
    try {
		var d=0;
		for (var c in cmds) (function (name,cmd) {
			var n=name
			_command(cmd,function(err,res) {
				d++;
	            if (err) {
	                compileStep.error({
	                    sourcePath: compileStep.inputPath,
	                    message: err
	                });
	            }
				if (n==='date') res=_date(new Date(Date.parse(res)));
				info[n]=res;
				if (d==cmds.length) {
			        var name = compileStep.inputPath.replace(/^.*[/]([^/]+).info$/, '$1');
			        var src = "" + name + " = " + JSON.stringify(info) + ";\n" +
						"if (Meteor.isClient) {\n" +
						"   Template.registerHelper('" + name + "',function(field) {\n" +
						"       return " + name + "[field];\n" +
						"   });\n" +
						"}";
					var opt={
			            path: compileStep.inputPath + '.js',
			            sourcePath: compileStep.inputPath,
			            data: src
			        }
			        compileStep.addJavaScript(opt);
				}
			})
		})(cmds[c].name,cmds[c].cmd);
    } catch (e) {
        compileStep.error({
            sourcePath: compileStep.inputPath,
            message: e
        });
    }
};

Plugin.registerSourceHandler("info", handler);