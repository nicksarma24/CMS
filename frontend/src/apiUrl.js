let URL;
if (!PROXY_URI) {
  URL = "http://0.0.0.0:8002/";
} else {
  URL = PROXY_URI.replace("{{port}}", 8002);
}
export let apiUrl = URL;
