import http from 'http';

export function serve(testFunction: Function, port = 4200, hostname = '127.0.0.1'): void {
  http
    .createServer((_, res) => {
      testFunction();

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Open your console...</h1>');
    })
    .listen(port, hostname, () => {
      console.info(`Server running at http://${hostname}:${port}/`);
    });
}
