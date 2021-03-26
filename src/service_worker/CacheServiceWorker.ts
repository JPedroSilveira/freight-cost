import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

class CacheServiceWorker {
  private FILE_EXTENSION_REGEX = new RegExp('/[^/?]+\\.[^/]+$')
  private FILE_EXTENSION_TO_CACHE = ['png', 'csv']

  registerCache = (scope: ServiceWorkerGlobalScope) => {
    clientsClaim()

    precacheAndRoute(scope.__WB_MANIFEST)
        
    registerRoute(
      ({ request, url }: { request: Request; url: URL }) => {
        if (request.mode !== 'navigate') return false
    
        if (url.pathname.startsWith('/_')) return false
    
        if (url.pathname.match(this.FILE_EXTENSION_REGEX)) return false
    
        return true
      },
      createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
    )
    
    registerRoute(
      ({ url }) => url.origin === self.location.origin && this.isValidFileToCache(url.pathname),
      new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
          new ExpirationPlugin({ maxEntries: 50 }),
        ],
      })
    )
    
    scope.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        scope.skipWaiting()
      }
    })
  }

  private isValidFileToCache(pathname: string) {
    return this.FILE_EXTENSION_TO_CACHE.some(extension => pathname.endsWith(`.${extension}`))
  }
}

 
export default new CacheServiceWorker()