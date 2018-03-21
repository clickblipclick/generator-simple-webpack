'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the lovely ${chalk.red('generator-simple-webpack')} generator!`)
    );

    const prompts = [
      {
        type: 'checkbox',
        name: 'features',
        message: 'Which features would you like to include?',
        choices: [
          {
            name: 'React',
            value: 'includeReact',
            checked: false
          },
          {
            name: 'SASS',
            value: 'includeSass',
            checked: false
          }
        ]
      },
      {
        type: 'confirm',
        name: 'babel',
        message: 'Do you want to use Babel?',
        when: answers => answers.features.indexOf('includeReact') === -1
      }
    ];

    return this.prompt(prompts).then(answers => {
      const features = answers.features;
      const hasFeature = feat => features && features.indexOf(feat) !== -1;

      this.includeReact = hasFeature('includeReact');
      this.includeSass = hasFeature('includeSass');
      this.includeBabel = hasFeature('includeReact') || answers.babel;
    });
  }

  writing() {
    this._writingWebpackConfig();
    this._writingPackageJSON();
    this._writingGit();
  }

  _writingWebpackConfig() {
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        includeSass: this.includeSass,
        includeReact: this.includeReact,
        includeBabel: this.includeBabel
      }
    );
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        includeSass: this.includeSass,
        includeReact: this.includeReact,
        includeBabel: this.includeBabel
      }
    );
  }

  _writingGit() {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }

  install() {
    this.installDependencies();
  }
};
