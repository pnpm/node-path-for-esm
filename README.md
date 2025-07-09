# @pnpm/plugin-esm-node-path

## Why is it needed

Node.js ESM (ES modules) doesn't support the `NODE_PATH` environment variable, unlike CommonJS modules. This creates [issues](https://github.com/pnpm/pnpm/issues/9618) when using pnpm with a [global virtual store](https://pnpm.io/settings#enableglobalvirtualstore). Many packages are importing other packages that are not actually in their dependnecies. To make these package work with pnpm, pnpm creates a directory with semi-hoisted packages at `node_modules/.pnpm/node_modules`. However, when a global virtual store is used, the dependnecies are symlinked from a different directory outside of the project's directory, so dependnecies from this hoisted `node_modules` are not used by Node.js during resolution. To solve this, pnpm adds this hoisted `node_modules` to `NODE_PATH`. This tells Node.js to search the hoisted `node_modules` for dependnecies. This works fine for dependnecies using the CommonJS module system. However, ESM stopped reading the `NODE_PATH` environment variable. That is why this config dependnecy was created. This config dependency registers an ES module loader that will look up dependencies in `NODE_PATH`.

## Installation

```
pnpm add --config @pnpm/plugin-esm-node-path
```

## License

MIT
