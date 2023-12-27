import isMobile from "../isMobile";
import UserAgent from "user-agents";
import { test, assert, describe } from "vitest";

const iphone =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1";
const chrome =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36";
const ffos = "Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0";
const ipad =
  "Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1";
const ios13ipad =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";
const ios13ipadpro =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15";
const samsung =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Safari/537.36";
const samsungMobile =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36";
const chromeOS =
  "Mozilla/5.0 (X11; CrOS armv7l 12105.100.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.144 Safari/537.36";

describe("isMobile", () => {
  // @ts-expect-error TS2304: Cannot find name global
  global.navigator = {};

  test("iphone", () => {
    // @ts-expect-error TS2540: Cannot assign to 'userAgent' because it is a read-only property.
    navigator.userAgent = iphone;
    assert(isMobile());
    assert(isMobile({ tablet: true }));
  });

  test("is mobile", () => {
    assert(isMobile({ ua: iphone }));
    assert(isMobile({ ua: ffos }));
    assert(isMobile({ ua: ipad, tablet: true }));
    assert(isMobile({ ua: samsungMobile }));

    // @ts-expect-error TS2540: Cannot assign to 'userAgent' because it is a read-only property.
    navigator.userAgent = iphone;
    assert(isMobile());
    assert(isMobile({ tablet: true }));

    // @ts-expect-error TS2540: Cannot assign to 'userAgent' because it is a read-only property.
    navigator.userAgent = ipad;
    assert(!isMobile());
    assert(isMobile({ tablet: true }));

    navigator = { maxTouchPoints: 5 } as Navigator;
    assert(isMobile({ ua: ios13ipad, tablet: true, featureDetect: true }));
    assert(isMobile({ ua: ios13ipadpro, tablet: true, featureDetect: true }));
  });

  test("is not mobile", () => {
    assert(!isMobile({ ua: ipad }));
    assert(!isMobile({ ua: chrome }));
    assert(!isMobile());
    assert(!isMobile({ ua: samsung }));
    assert(!isMobile({ ua: chromeOS }));
    assert(!isMobile({ ua: chromeOS, tablet: true }));

    // @ts-expect-error TS2540: Cannot assign to 'userAgent' because it is a read-only property.
    navigator.userAgent = chrome;
    assert(!isMobile());
    assert(!isMobile({ tablet: true }));
  });

  describe("check some random user agent strings", function () {
    const limit = 300;
    const testedUaStrings: string[] = [];

    const checks = [
      { deviceCategory: "mobile", result: true },
      { deviceCategory: "tablet", result: true, tablet: true },
      { deviceCategory: "desktop", result: false },
    ];

    type TestCase = {
      ua: string;
      result: boolean;
      tablet?: boolean;
    };

    const testCases = checks.reduce(
      (cases: (TestCase | undefined)[], currentCase) => {
        const { deviceCategory, result, tablet } = currentCase;

        // The same user-agent string belongs to both `desktop` and `mobile` type entries. No chance to detect `deviceType` properly.
        // https://github.com/intoli/user-agents/blob/867e318bc00880ae00437e5e8efaa8e5e7ac0696/src/user-agents.json.gz
        // user-agents v1.0.843
        const exclude =
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36";

        const ua = new UserAgent([
          ({ userAgent }) => userAgent !== exclude,
          { deviceCategory },
        ]);

        return [
          ...cases,
          ...new Array(limit).fill({}).map(() => {
            const randomUaString = ua.random().toString();

            if (testedUaStrings.includes(randomUaString)) {
              return undefined;
            }

            testedUaStrings.push(randomUaString);

            return {
              ua: randomUaString,
              result,
              tablet,
            };
          }),
        ];
      },
      [],
    );

    const definedTestCases = testCases.filter(
      (testCase) => testCase !== undefined,
    );

    definedTestCases.forEach((testCase) => {
      const { ua, result, tablet } = testCase as TestCase;

      test(ua, () => {
        assert.strictEqual(isMobile({ ua, tablet }), result);
      });
    });
  });
});
