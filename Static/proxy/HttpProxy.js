const fetch = require('node-fetch');

const subscriptionKey = 'DCDoRS8v5HQ_nuZs81L-hqvYpzdDRPuyQFyQB1cpfKg';
const css = 'https://talbsmapcontrol.blob.core.windows.net/javascript/mapcontrol/3.0/atlas.min.css';
const js = 'https://talbsmapcontrol.blob.core.windows.net/javascript/mapcontrol/3.0/atlas.min.js';

const parseCookie = str => {
  if (!str) return {};
  return str
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});
}

module.exports = async function (context, req) {

    const host = process.env["STATIC_WEBSITE_URL"] || 'azuremaps.z13.web.core.windows.net';
    const url = `https://${host}/${req.query.path}`;

    if ((/\.(gif|jpe?g|png|css|ico|bin|gltf|glb)$/i).test(url)) {
        context.res.status(302).set('location', url).send();
        return;
    }
    
    const response = await fetch(url);
    const contentType = response.headers.get('Content-Type');
    const cookies = parseCookie(req.headers.cookie) || {};
    let body = await response.text();
    
    if (contentType === 'text/html' && body && req.query.path !== 'settings.html') {
        if (cookies['subscriptionKey']) {
            body = body.replace(subscriptionKey, cookies['subscriptionKey']);
        }
        if (cookies['css']) {
            body = body.replace(css, cookies['css']);
        }
        if (cookies['js']) {
            body = body.replace(js, cookies['js']);
        }
        // For Spatial IO modules
        body = body.replace(
            'https://samples.azuremaps.com/api/GetDataFromUrl?url=',
            'https://azuremaps-samples.azurewebsites.net/api/GetDataFromUrl?url=');
    }

    context.res = {
        headers: { "Content-Type": contentType, "Cache-Control": "no-cache" },
        body
    }
}