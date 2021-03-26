/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import CacheServiceWorker from "./service_worker/CacheServiceWorker"

declare const self: ServiceWorkerGlobalScope

CacheServiceWorker.registerCache(self)