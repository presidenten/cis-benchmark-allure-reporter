const path = require('path');
const fs = require('fs');
const Allure = require('allure-js-commons');

const resultFiles = fs.readdirSync('output').filter(f => path.extname(f) === '.json');
if (resultFiles.length === 0) {
  console.log(`
    Please put some .json-result files in /app/output

    Mount directory to docker container with:
      -v $(pwd)/output:/app/output
  `);
  process.exit(1);
}

console.log('Converting .json to allure');

const allure = new Allure();
allure.setOptions({ targetDir: path.resolve('./output/allure-raw') });

resultFiles.map(r => require(path.resolve('output/', r))).forEach((res) => {
  const type = res.profiles[0].name.match(/-(.+)-/)[1];

  res.profiles[0].groups
    .map(g => ({
      title: g.title,
      controls: g.controls.map(id => res.profiles[0].controls.find(c => c.id === id)),
    }))
    .forEach((suite) => {

      allure.startSuite(type + ' - ' + suite.title);

      suite.controls.forEach((test) => {
        allure.startCase(test.id.match(/\d+\.\d+(\.\d+)?$/)[0] + ' - ' + test.title);
        allure.setDescription(test.desc + '\n\nImpact: ' + test.impact);
        allure.getCurrentTest().addParameter('environment-variable', 'platform', res.platform.name + '-' + res.platform.release);

        let message = '';
        test.results.forEach((step) => {
          if(step.message) {
            message += step.message + '\n';
          }
          allure.startStep(step.code_desc, 0);
          allure.endStep(step.status);
        })

        const result = test.results
          .map(r => r.status)
          .map(r => r === 'passed' ? 1 : r === 'skipped' ? 0 : undefined)
          .reduce((acc, cur) => { return acc + cur }, 0);

        const status = result === 0 ? 'skipped' : result > 0 ? 'passed' : 'failed';

        allure.endCase(status, {message});
      })

      allure.endSuite();
    });
});
