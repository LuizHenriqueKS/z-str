import ZStrOptions from './ZStrOptions';

class ZStrValidOptions implements ZStrOptions {
  caseSensitive: boolean = true;
  ignoreErrors: boolean = false;
  inclusive: boolean = false;
}

export default ZStrValidOptions;
