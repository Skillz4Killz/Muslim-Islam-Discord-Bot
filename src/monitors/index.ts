export async function loadMonitors() {
  await import("./collectors.js");
  await import("./quote.js");
  await import("./salam.js");
}
