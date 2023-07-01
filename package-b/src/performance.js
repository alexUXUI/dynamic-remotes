const perfObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  for (const entry of entries) {
    console.log(`New "${entry.entryType}" entry:`, entry);
  }
});

export function runDiagnostic() {
  perfObserver.observe({
    entryTypes: ['paint', 'layout-shift', 'resource', 'navigation', 'element'],
  });
}
