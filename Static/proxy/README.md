
## About

This is a small Azure Function proxy app for testing different versions of the WebSDK using Azure Maps samples.
The proxy will replace the subscriptionKey and WebSDK javascript/css paths in HTMLs with values stored in the cookie at runtime.

## Usage

1. Goto https://azuremaps-samples.azurewebsites.net/settings.html and choose the subscription key and SDK version you wish to test.

2. Goto https://azuremaps-samples.azurewebsites.net and start testing!

3. (Optional) WebSDK 1.x doesn't work in the test environment anymore, but you can still test it in the production environment by setting the following cookies manually in the browser console.

document.cookie = 'css=https://atlas.microsoft.com/sdk/javascript/mapcontrol/1.3/atlas.min.css';
document.cookie = 'js=https://atlas.microsoft.com/sdk/javascript/mapcontrol/1.3/atlas.min.js';
document.cookie = 'subscriptionKey=<Your production subscriptionKey>';

Similarly, you can test buddy builds by using
document.cookie = 'css=https://t-azmaps.azurelbs.com/sdk/javascript/mapcontrol/2.2.3-84/atlas.min.css';
document.cookie = 'js=https://t-azmaps.azurelbs.com/sdk/javascript/mapcontrol/2.2.3-84/atlas.min.js';
