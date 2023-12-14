// Processing during installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("your-cache-name").then((cache) => {
      return cache.addAll(["/", "/index.html"]);
    }),
  );
});

// Cache load processing during Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          return caches.match("/index.html");
        })
      );
    }),
  );
});
