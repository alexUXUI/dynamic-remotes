// use the browser performance API to measure the time it takes to load the page
// console.log('hello world from package-b::runDiagnostic');

const perfObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  for (const entry of entries) {
    console.log(`New "${entry.entryType}" entry:`, entry);
  }
});

export function runDiagnostic() {
  // Observe all available entry types
  // console.log(
  //   'hello world from package-b::runDiagnostic::perfObserver.observe'
  // );
  perfObserver.observe({
    entryTypes: ['paint', 'layout-shift', 'resource', 'navigation', 'element'],
  });
}
