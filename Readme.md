# Inline Script Source Map

A demo of source map for inline scripts.

```bash
$ npm install
$ ./bin/precompile  # Compile main.js into index.html
$ npm start
```

Navigate browser to <http://localhost:4000>. The server started now serves the
compiled frontpage at `public/index.html`. There are `//# sourceURL=main.js` and
`//# sourceMappingURL=./main.map` in the inlined script. Devtools can generate
the mapped source, but breakpoints won't work.


## Why inline script?

If the page is small, e.g. Ad, we can inline the script to eliminate a request.
