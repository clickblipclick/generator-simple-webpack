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
      },
      {
        type: 'confirm',
        name: 'autoPretty',
        message: 'Do you want to auto-run Prettier in a pre-commit hook?',
        when: answers => answers.features.indexOf('includePrettier')
      },
      {
        type: 'confirm',
        name: 'gitInit',
        message: 'Should we initialize a Git respository for you?'
      },
      {
        type: 'input',
        name: 'portNumber',
        message: 'What port should the dev server run on?',
        default: function() {
          return '4444';
        },
        validate: input => {
          if (Number.isNaN(input)) {
            return false;
          }
          var parsedNum = Number.parseFloat(input);
          if (Number.isInteger(parsedNum) && parsedNum < 100000) {
            return true;
          }
          return false;
        }
      }
    ];

    return this.prompt(prompts).then(answers => {
      const features = answers.features;
      const hasFeature = feat => features && features.indexOf(feat) !== -1;

      this.portNumber = answers.portNumber;
      this.gitInit = answers.gitInit;
      this.autoPretty = answers.autoPretty;
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

    this.fs.copy(this.templatePath('cfg'), this.destinationPath('cfg'));
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        includeSass: this.includeSass,
        includeReact: this.includeReact,
        includeBabel: this.includeBabel,
        includePrettier: this.includePrettier,
        autoPretty: this.autoPretty,
        portNumber: this.portNumber
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

    if (this.includeReact) {
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
    if (this.gitInit) {
      this.spawnCommand('git', ['init']);
    }
    this.installDependencies({
      bower: false
    });
  }
};
