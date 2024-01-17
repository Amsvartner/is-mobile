# is-mobile
Check user agent string to discern if the user device is a mobile phone or not.

All credit goes to the original project and author:
https://github.com/juliangruber/is-mobile/tree/main  

### Changes from original version:
- Works in browser environments, instead of NodeJS
- Code is now in TypeScript
- The code should now be a little easier to read for humans  

### Installation

This package is not published on NPM (it's a TODO), so you'll have to add it to your project manually.
- If you are using TypeScript, copy the contents of `isMobile.ts` into a file in your own project, and import it from there.
- If you are using JavaScript, you can use the compiled content in `isMobile.js` instead.  

### Usage

```ts
import isMobile from 'wherever-you-put-it/isMobile.js';

const isMobilePhone = isMobile();
const isMobilePhoneOrTablet = isMobile({ tablet: true });
const isMobilePhoneOrTabletOrIPad = isMobile({ tablet: true, featureDetect: true });
```

For more ways to use this util, have a look in the test file.  

### Last words

Some people will frown on you for using stuff like this ;)
