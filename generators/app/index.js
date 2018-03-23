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
          },
          {
            name: 'Prettier',
            value: 'includePrettier',
            checked: true
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
      this.includePrettier = hasFeature('includePrettier');
      this.includeBabel = hasFeature('includeReact') || answers.babel;
    });
  }

  writing() {
    this._writingWebpackConfig();
    this._writingPackageJSON();
    this._writingGit();
    this._writingJS();
    this._writingStyles();
    this._writingHTML();
    this._writingExtras();
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
        includeBabel: this.includeBabel,
        includePrettier: this.includePrettier
      }
    );
  }

  _writingGit() {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }

  _writingJS() {
    const templatePath = this.includeReact
      ? 'index-react.js'
      : this.includeBabel ? 'index-es6.js' : 'index-es5.js';

    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath('src/scripts/index.js'),
      {
        includeSass: this.includeSass
      }
    );

    this.fs.copyTpl(
      this.templatePath('app-react.js'),
      this.destinationPath('src/scripts/App.js'),
      {
        includeSass: this.includeSass,
        includeReact: this.includeReact,
        includeBabel: this.includeBabel,
        includePrettier: this.includePrettier
      }
    );
  }

  _writingStyles() {
    const extension = this.includeSass ? 'scss' : 'css';

    this.fs.copy(
      this.templatePath(`main.${extension}`),
      this.destinationPath(`src/styles/main.${extension}`)
    );
  }

  _writingHTML() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      {
        includeSass: this.includeSass,
        includeReact: this.includeReact,
        includeBabel: this.includeBabel,
        includePrettier: this.includePrettier
      }
    );
  }

  _writingExtras() {
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
