import http from "node:http";
import net from "node:net";

const TARGET_HOST = "140.82.121.3"; // Verified working GitHub IP
const TARGET_PORT = 443;
const PROXY_PORT = 8888;

const server = http.createServer((req, res) => {
  res.writeHead(405, { "Content-Type": "text/plain" });
  res.end("Method Not Allowed");
});

server.on("connect", (req, clientSocket, head) => {
  const targetSocket = net.connect(TARGET_PORT, TARGET_HOST, () => {
    clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    if (head && head.length > 0) {
      targetSocket.write(head);
    }
    targetSocket.pipe(clientSocket);
    clientSocket.pipe(targetSocket);
  });

  targetSocket.on("error", () => {
    clientSocket.destroy();
  });

  clientSocket.on("error", () => {
    targetSocket.destroy();
  });
});

server.listen(PROXY_PORT, "127.0.0.1", () => {
  console.log(`GitHub CONNECT Proxy running on 127.0.0.1:${PROXY_PORT}`);
});
