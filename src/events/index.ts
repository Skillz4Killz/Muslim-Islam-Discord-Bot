export async function loadEvents() {
    await import("./guildCreate.js");
    await import("./interactionCreate.js");
    await import("./messageCreate.js");
    await import("./ready.js");
}