// Register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits and gives it offline capabilities. It also means that users will
// only see deployed updates on the "N+1" visit to a page, since previously cached resources are updated in the
// background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
)

const register = publicUrl => {
  if ('serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const url = new URL(publicUrl, window.location)
    if (url.origin !== window.location.origin) {
      // Our service worker won't work if publicUrl is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return
    }

    window.addEventListener('load', () => {
      const swUrl = `${publicUrl}/service-worker.js`

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl)
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl)
      }
    })
  }
}

const registerValidSW = swUrl => {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; Reloading...') // eslint-disable-line no-console

              window.location.reload(true)
            } else {
              console.log('Content is cached for offline use.') // eslint-disable-line no-console
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error) // eslint-disable-line no-console
    })
}

const checkValidServiceWorker = swUrl => {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl)
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.') // eslint-disable-line no-console
    })
}

export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister()
    })
  }
}

export default register
