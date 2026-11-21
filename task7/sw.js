const CACHE_VERSION = "v1";
const SHELL_CACHE = `car-shell-${CACHE_VERSION}`;
const ASSETS_CACHE = `car-assets-${CACHE_VERSION}`;
const API_CACHE = `car-api-${CACHE_VERSION}`;

const MAX_ASSET_ENTRIES = 60;
const MAX_API_ENTRIES = 30;

const SHELL_URLS = [
  "./",
  "./index.html",
  "./offline",
  "./manifest.json",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png",
];

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map((request) => cache.delete(request)));
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => {
      return Promise.allSettled(
        SHELL_URLS.map((url) =>
          fetch(url).then((response) => {
            if (response && response.ok) {
              return cache.put(url, response);
            }
          })
        )
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  const validCaches = [SHELL_CACHE, ASSETS_CACHE, API_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !validCaches.includes(name))
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isAuthOrPrivateRequest(url) {
  return (
    url.hostname.includes("identitytoolkit.googleapis.com") ||
    url.hostname.includes("securetoken.googleapis.com") ||
    url.hostname.includes("firestore.googleapis.com") ||
    url.pathname.includes("/auth") ||
    url.pathname.includes("/login") ||
    url.pathname.includes("/token")
  );
}
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!url.protocol.startsWith("http")) return;

  if (isAuthOrPrivateRequest(url)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;

          const cachedIndex = await caches.match("./index.html");
          if (cachedIndex) return cachedIndex;

          const cachedOffline = await caches.match("./offline");
          if (cachedOffline) return cachedOffline;

          return new Response("Offline", { status: 503, statusText: "Offline" });
        })
    );
    return;
  }
  if (
    ["image", "font", "style", "script"].includes(request.destination) ||
    /\.(png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|css|js)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then(async (cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(ASSETS_CACHE);
            await cache.put(request, networkResponse.clone());
            await trimCache(ASSETS_CACHE, MAX_ASSET_ENTRIES);
          }
          return networkResponse;
        } catch {
          return new Response("", { status: 503, statusText: "Offline Asset" });
        }
      })
    );
    return;
  }
  event.respondWith(
    fetch(request)
      .then(async (networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          const cache = await caches.open(API_CACHE);
          await cache.put(request, networkResponse.clone());
          await trimCache(API_CACHE, MAX_API_ENTRIES);
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        return new Response(
          JSON.stringify({
            offline: true,
            message: "Нет подключения к интернету и нет сохранённых данных",
          }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          }
        );
      })
  );
});