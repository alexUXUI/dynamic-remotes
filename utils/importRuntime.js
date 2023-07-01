const REMOTE_ENTRY_FILE = 'remoteEntry.js';

const loadRemote = (url, scope, bustRemoteEntryCache) => {
  return new Promise((resolve, reject) => {
    const timestamp = bustRemoteEntryCache ? `?t=${new Date().getTime()}` : '';
    __webpack_require__.l(
      `${url}${timestamp}`,
      (event) => {
        if (event?.type === 'load') {
          // Script loaded successfully:
          return resolve();
        }
        const realSrc = event?.target?.src;
        const error = new Error();
        error.message = 'Loading script failed.\n(missing: ' + realSrc + ')';
        error.name = 'ScriptExternalLoadError';
        reject(error);
      },
      scope
    );
  });
};

const initSharing = async () => {
  const shareScopes = __webpack_share_scopes__;
  if (!shareScopes?.default) {
    await __webpack_init_sharing__('default');
  }
};

const initContainer = async (containerScope) => {
  try {
    const shareScopes = __webpack_share_scopes__;
    if (!containerScope.__initialized && !containerScope.__initializing) {
      containerScope.__initializing = true;
      await containerScope.init(shareScopes.default);
      containerScope.__initialized = true;
      delete containerScope.__initializing;
    }
  } catch (error) {
    console.error(error);
  }
};

export const importRemote = async ({
  url,
  scope,
  module,
  remoteEntryFileName = REMOTE_ENTRY_FILE,
  bustRemoteEntryCache = true,
}) => {
  const remoteScope = scope;
  if (!window[remoteScope]) {
    let remoteUrl = '';

    if (typeof url === 'string') {
      remoteUrl = url;
    } else {
      remoteUrl = await url();
    }

    // Load the remote and initialize the share scope if it's empty
    await Promise.all([
      loadRemote(
        `${remoteUrl}/${remoteEntryFileName}`,
        scope,
        bustRemoteEntryCache
      ),
      initSharing(),
    ]);

    if (!window[remoteScope]) {
      throw new Error(
        `Remote loaded successfully but ${scope} could not be found! Verify that the name is correct in the Webpack configuration!`
      );
    }

    // Initialize the container to get shared modules and get the module factory:
    const [initResponse, moduleFactory] = await Promise.all([
      initContainer(window[remoteScope]),
      window[remoteScope].get(
        module === '.' || module.startsWith('./') ? module : `./${module}`
      ),
    ]);
    return moduleFactory();
  } else {
    const moduleFactory = await window[remoteScope].get(
      module === '.' || module.startsWith('./') ? module : `./${module}`
    );
    return moduleFactory();
  }
};
