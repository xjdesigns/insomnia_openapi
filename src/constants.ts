type IRegex = {
	paramRegex: RegExp;
	promptRegex: RegExp;
	promptValueRegex: RegExp;
	promptRegexWBrackets: RegExp;
	urlMatch: RegExp;
	varMatch: RegExp;
}

export const REGEX: IRegex = {
	paramRegex: /{(.*?)}/g,
	promptRegex: /{%(.*?)%}/g,
	promptValueRegex: /'(.*?)'/g,
	promptRegexWBrackets: /({%.*?%})/, // leave off the global to grab all matches
	urlMatch: /({{.*?}})/,
	varMatch: /({{.*?}})/g
}
