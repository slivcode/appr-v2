export let pairToStr = ([k, v]) => `\t${k}: ${v};`;
export let wrapBraces = sel => ctn => `${sel} {\n${ctn}\n}\n`;
export function styleHyphenFormat(propertyName) {
	function upperToHyphenLower(match, offset, string) {
		return (offset ? '-' : '') + match.toLowerCase();
	}
	return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}