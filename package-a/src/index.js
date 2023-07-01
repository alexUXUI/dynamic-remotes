import { importRemote } from '../../utils/importRuntime';

importRemote({
  url: 'http://localhost:8081',
  scope: 'package_b',
  module: 'performance',
}).then((module) => {
  const mod = module();
  console.log('mod ', mod);
  mod.runDiagnostic();
});
