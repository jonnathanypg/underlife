const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Prefixes and extensions that get 1-year immutable cache
// IMPORTANT: Add any new public static-asset folders here so they get
// Cache-Control: public, max-age=31536000, immutable from day 1.
const IMMUTABLE_PREFIXES = [
  '/recursos_opt/',
  '/logos/',
  '/icons/',
  '/_next/static/',
  '/_next/image/',
  // Gallery image folders (public static images — never change filename)
  '/hiphop/',
  '/ninos/',
  '/talleres/',
  '/hackathon/',
  '/artivismo-img/',
  // CDI center image folders
  '/cdi-amiguitos-a-jugar/',
  '/cdi-caritas-alegres/',
  '/cdi-gotitas-del-saber/',
  '/cdi-pedacitos-de-amor/',
];
const IMMUTABLE_EXTS = /\.(webp|jpg|jpeg|png|gif|svg|ico|mp4|webm|woff|woff2|otf|ttf|eot)$/i;

app.prepare()
  .then(() => {
    const server = createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        const pathname = parsedUrl.pathname || '';

        // Serve static assets with 1-year immutable cache
        const isImmutable =
          IMMUTABLE_PREFIXES.some((p) => pathname.startsWith(p)) ||
          IMMUTABLE_EXTS.test(pathname);

        if (isImmutable && !dev) {
          // Lock Cache-Control so Next.js static file handlers cannot overwrite it
          const originalSetHeader = res.setHeader.bind(res);
          originalSetHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader = function (name, value) {
            if (typeof name === 'string' && name.toLowerCase() === 'cache-control') {
              return originalSetHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
            return originalSetHeader(name, value);
          };
        }

        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error handling request:', req.url, err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      }
    });

    server.listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> Fundación Underlife Server ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error starting Next.js server:', err);
    process.exit(1);
  });
