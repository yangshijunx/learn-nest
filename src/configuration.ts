import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as yaml from 'js-yaml';
import * as _ from 'loadsh';

const YAML_COMMON_CONFIG_FILENAME = 'config.yml';
// console.log('当前文件夹目录');
const filePath = resolve(
  __dirname,
  '../',
  'src',
  'config',
  YAML_COMMON_CONFIG_FILENAME,
);
const envPath = resolve(
  __dirname,
  '../',
  'src',
  'config',
  `config.${process.env.NODE_ENV || 'development'}.yml`,
);

const commonConfig = yaml.load(readFileSync(filePath, 'utf-8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf-8'));

export default () => {
  return _.merge(commonConfig, envConfig);
};
