module.exports = { compile: compile };


function compile(ast) {

	return `
		if (keystates["Mouse"]) {
			ctx.fillStyle = "#000";
			ctx.fillText("mouse is down!", 0, 20);
		}
	`;
}