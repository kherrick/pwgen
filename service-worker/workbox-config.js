const WORKBOX_CONFIG_PATH = process.env.WORKBOX_CONFIG_PATH || '/'

module.exports = {
  globDirectory: './',
  globPatterns: ['**/*.{css,js,png,ico,html}', 'manifest.json'],
  globIgnores: [
    '**/node_modules/**/*',
    '**/service-worker.js',
    'src/**',
    'lib/main.js',
    'lib/pwgen.js',
  ],
  templatedURLs: {
    [`${WORKBOX_CONFIG_PATH}`]: `${new Date()}`
  },
  swDest: 'service-worker.js',
  // Define runtime caching rules.
  runtimeCaching: [
    {
      // Match any request ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

      // Apply a cache-first strategy.
      handler: 'CacheFirst',

      options: {
        // Use a custom cache name.
        cacheName: 'images',

        // Only cache 10 images.
        expiration: {
          maxEntries: 100
        }
      }
    },
    {
      urlPattern: new RegExp('^https://fonts.gstatic.com/.*$'),
      handler: 'CacheFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200]
        },
        cacheName: 'fonts-gstatic-com-cache',
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: new RegExp('^https://fonts.googleapis.com/.*$'),
      handler: 'CacheFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200]
        },
        cacheName: 'fonts-googleapis-com-cache',
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: new RegExp('^https://github.blog/.*$'),
      handler: 'CacheFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200]
        },
        cacheName: 'github-blog-cache',
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: new RegExp('^https://kherrick.github.io/x-pwgen-components.*$'),
      handler: 'CacheFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200]
        },
        cacheName: 'kherrick-github-io-x-pwgen-components-cache',
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    },
    {
      urlPattern: new RegExp('^https://kherrick.github.io/pwgen.*$'),
      handler: 'NetworkFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200]
        },
        cacheName: 'kherrick-github-io-pwgen-cache',
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
        }
      }
    }
  ]
}
