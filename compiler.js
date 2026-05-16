module.exports = { compile: compile };


function compile(ast) {

	return `
		function process() {

			if (INTERNAL_keystates["Mouse"]) {
				INTERNAL_ctx.fillStyle = "#000";
				INTERNAL_ctx.fillText("mouse is down!", 0, 20);
			}
		}
	`;
}