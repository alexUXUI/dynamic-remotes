import { importRemote } from '../../utils/importRuntime';

const remoteConfig = {
  url: 'http://localhost:8081',
  scope: 'package_b',
};

function loadFeature(boolean) {
  return importRemote({ ...remoteConfig, module: boolean ? 'a' : 'b' }).then(
    ({ run }) => run()
  );
}

window.ldclient.on('ready', () => {
  const flagKey = 'federated-feature';
  const flagValue = window.ldclient.variation(flagKey, false);
  loadFeature(flagValue);
});

window.ldclient.on('change', () => console.log('LD client failed'));
