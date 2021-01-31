import ZStrOptions from './ZStrOptions';

class ZStrValidOptions implements ZStrOptions {
  caseSensitive: boolean = true;
  ignoreNotFoundPatterns: boolean = false;
  inclusive: boolean = false;
}

export default ZStrValidOptions;
