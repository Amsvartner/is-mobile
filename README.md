# is-mobile
Check user agent string to discern if the user device is a mobile phone or not.

All credit goes to the original project and author:
https://github.com/juliangruber/is-mobile/tree/main

### Changes from original version:
- Works in browser environments, instead of NodeJS
- Code is now in TypeScript and JavaScript - pick the version that suits your project
- The code should now be a little easier to read for humans

### Installation

This package is not published on NPM (it's a TODO), so you'll have to add it to your project manually.
- Just copy the contents of 'isMobile.js' into a file in your own project, and import it from there.
- If you are using TypeScript, copy the contents of 'isMobile.ts' instead and don't forget the types in 'isMobileOptions.ts'.

### Usage

```ts
import isMobile from 'wherever-you-put-it/isMobile.js';

const isMobilePhone = isMobile();
const isMobilePhoneOrTablet = isMobile({ tablet: true });
const isMobilePhoneOrTabletOrIPad = isMobile({ tablet: true, featureDetect: true });
```

For more ways to use this util, have a look in the test file.
