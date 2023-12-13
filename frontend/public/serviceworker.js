// インストール時の処理
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("your-cache-name").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        // "/src/index.css",
        // "/src/App.jsx",
        // 他にキャッシュしたい静的ファイル
      ]);
    }),
  );
});

// Fetch時のキャッシュロード処理
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
