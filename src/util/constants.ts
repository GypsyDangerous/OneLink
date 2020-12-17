import chroma from "chroma-js";

export const colors = [
	"#001aff",
	"#7000ff",
	"#ab68ff",
	"#bd00ff",
	"#ff6a85",
	"#282828",
	"#01a5c8",
	"#00ffd1",
	"#00ff19",
	"#7eff8b",
	"#ff6767",
	"#ff7a00",
	"#e40025",
	"#e8833e",
	"#306844",
	"#007bff",
	"#fdd618",
	"#6ab04c",
	"#e45f00",
	"#2c4d5a",
	"#09ad1e",
	"#ffbcb9",
].sort((a, b) => chroma(a).luminance() - chroma(b).luminance());

export const defaultImages = {};
