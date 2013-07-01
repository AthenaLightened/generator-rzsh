'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var RzshGenerator = module.exports = function RzshGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: true
    }); 
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(RzshGenerator, yeoman.generators.Base);

RzshGenerator.prototype.askFor = function askFor() {

  console.log("\nWelcome, little fisher!\n".red);

  /*
  var cb = this.async();
  var prompts = [{
    type: 'confirm',
    name: 'yii',
    message: 'Would you like to include Yii?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.options.yii = props.yii;

    cb();
  }.bind(this));
  */
};


RzshGenerator.prototype.app = function () {

  this.mkdir('bin');
  this.mkdir('configs');
  this.mkdir('webroot');
  this.mkdir('server');
  this.mkdir('client/app');

  this.copy('_virtualhost',     'configs/virtualhost');
  this.copy('api.postman.json', 'configs/api.postman.json');
};

RzshGenerator.prototype.client = function () {
  var client = "client/";

  this.copy('client/_package.json', client + 'package.json');
  this.copy('client/jshintrc',      client + '.jshintrc');
  this.copy('client/_bowerrc',      client + '.bowerrc');
  this.copy('client/_bower.json',   client + 'bower.json');
  this.copy('client/_Gruntfile.js', client + 'Gruntfile.js');
  this.copy('client/_index.html',   client + 'index.html');

  var app = client + "app/";
  this.mkdir(app + "templates");
  this.copy('client/app/_app.js',    app + 'app.js');
  this.copy('client/app/_config.js', app + 'config.js');
  this.copy('client/app/main.js',    app + 'main.js');
  this.copy('client/app/router.js',  app + 'router.js');
  this.copy('client/app/util.js',    app + 'util.js');
};
