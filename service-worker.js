/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "7c972065e403b2dd8ceabb963b73c854"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "5f6db033b6cdb784b59f455c25350805"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "9df20ffe08ff574eab5321c559d2faef"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "711cffcc6bad413d3b114e7cf9b73b74"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "58b78d7bc627550b29b5aa64864f3c50"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "29b88a6658b35e7a175618e40f08affd"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "e338a06c540b87bb005f2c8e3b505754"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "a9c1ad970d8ded80e04e6ba4152cfc7d"
  },
  {
    "url": "dist/lib/esm/component/XPwgen.js",
    "revision": "ef224ce165c6c5bf72a13f09c17ae6ec"
  },
  {
    "url": "dist/lib/esm/pwgen.js",
    "revision": "7d8db2983f056e7f5f47e5d23824c423"
  },
  {
    "url": "favicon.ico",
    "revision": "8e95f1cb8b20c3c74e03e8788dcf2130"
  },
  {
    "url": "index.html",
    "revision": "322ab8902175c4d58a0b31913dc900d4"
  },
  {
    "url": "service-worker/registerServiceWorker.js",
    "revision": "5f136c4eecf4354fbcda0e23a0b29b40"
  },
  {
    "url": "manifest.json",
    "revision": "42dde072100a3d8537ff4d861b907e00"
  },
  {
    "url": "/pwgen/",
    "revision": "20b0d7b41faa466e6b54c58e9124ec8e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, new workbox.strategies.CacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({ maxEntries: 100, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts.gstatic.com\/.*$/, new workbox.strategies.CacheFirst({ "cacheName":"fonts-gstatic-com-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] }), new workbox.expiration.Plugin({ maxEntries: 1000, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts.googleapis.com\/.*$/, new workbox.strategies.CacheFirst({ "cacheName":"fonts-googleapis-com-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] }), new workbox.expiration.Plugin({ maxEntries: 1000, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/github.blog\/.*$/, new workbox.strategies.CacheFirst({ "cacheName":"github-blog-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] }), new workbox.expiration.Plugin({ maxEntries: 1000, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/kherrick.github.io\/x-pwgen-components.*$/, new workbox.strategies.CacheFirst({ "cacheName":"kherrick-github-io-x-pwgen-components-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] }), new workbox.expiration.Plugin({ maxEntries: 1000, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/kherrick.github.io\/pwgen.*$/, new workbox.strategies.NetworkFirst({ "cacheName":"kherrick-github-io-pwgen-cache", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] }), new workbox.expiration.Plugin({ maxEntries: 1000, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
