/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core"
import CacheServiceWorker from "./service_worker/CacheServiceWorker"
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope

clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)

CacheServiceWorker.registerCache(self)