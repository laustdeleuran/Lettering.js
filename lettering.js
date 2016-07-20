'use strict';

/**
 * @overview Lettering.js
 *
 * @description
 * ES6 version of [Dave Rupert's Lettering.JS](https://github.com/davatron5000/Lettering.js)
 *
 * @author ljd
 */

function injector(element, splitter, cssClass, after = '') {
	var text = element.textContent,
		arr = text.split(splitter),
		inject = '';

	if (arr.length) {
		arr.forEach(function(item, index) {
			inject += `<span class="${cssClass}${index + 1}" aria-hidden="true">${item}</span>${after}`;
		});

		element.setAttribute('aria-label', text);
		element.innerHTML = inject;
	}
}

export function letters(element, cssClass = 'char--') {
	injector(element, '', cssClass);
}

export function words(element, cssClass = 'word--') {
	injector(element, ' ', cssClass, ' ');
}

export function lines(element, cssClass = 'line--') {
	// Because it's hard to split a <br/> tag consistently across browsers, (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash (of the word "split"). If you're trying to use this plugin on that md5 hash string, it will fail because you're being ridiculous.
	var r = 'eefec303079ad17405c889e092e105b0';
	var breaks = element.querySelectorAll('br');
	breaks.forEach(br => br.outerHTML = r);

	injector(element, r, cssClass);
}

const methods = {
	letters,
	words,
	lines
};

export default function lettering(element, method = 'letters', cssClass) {
	if (methods[method]) {
		methods[method].apply(this, [element, cssClass]);
	} else {
		throw new Error('Method ' + method + ' does not exist in lettering.js.');
	}
}