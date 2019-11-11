cis-benchmark-allure-reporter
=============================

What it is
----------

This is a docker image that generates Allure reports from https://dev-sec.io Chef Inspec [CIS-benchmarks](https://www.cisecurity.org/cis-benchmarks/) json-results, generated from [dev-sec-cis-benchmarks](https://github.com/presidenten/dev-sec-cis-benchmarks) that runs benchmarks for:
- [dil (distribution independent linux)](https://github.com/dev-sec/cis-dil-benchmark)
- [docker](https://github.com/dev-sec/cis-docker-benchmark)
- [kubernetes](https://github.com/dev-sec/cis-kubernetes-benchmark)

![Allure screenshot](https://github.com/presidenten/cis-benchmark-allure-reporter/raw/master/docs/allure.jpg)

---

Features
--------

- Nice overview of [CIS-benchmarks](https://www.cisecurity.org/cis-benchmarks/) compliance
- Allure collects a trend over compliance status
- Test drilldown shows human readable description of each item

![Allure screenshot](https://github.com/presidenten/cis-benchmark-allure-reporter/raw/master/docs/description.jpg)

---

How to use
----------

### Preparation

The scanner user needs to have ssh-keys to the server in `~/.ssh`.


### Execution

See [`./scripts`](https://github.com/presidenten/cis-benchmark-allure-reporter/tree/master/scripts) in the [github repo](https://github.com/presidenten/cis-benchmark-allure-reporter) for examples.

Put username and server info in `./scripts/config.sh`, then scan and host.
```bash
./scripts/scan.sh
./scripts/host.sh
```
