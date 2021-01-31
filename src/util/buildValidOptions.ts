import ZStrOptions from '../core/ZStrOptions';
import ZStrValidOptions from '../core/ZStrValidOptions';

function buildValidOptions(options?: ZStrOptions): ZStrValidOptions {
  const opt = new ZStrValidOptions();
  return { ...opt, ...options };
}

export default buildValidOptions;
