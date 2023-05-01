export async function loadCommands() {
    await import("./ayah.js");
    await import("./invite.js");
    await import("./ping.js");
    await import("./learn.js");
    await import("./quiz.js");
    await import("./remind.js");
    await import("./remindchannel.js");
    await import("./stats.js");
}