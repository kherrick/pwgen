 /*
 * Copyright (C) 2003-2006 KATO Kazuyoshi <kzys@8-p.info>
 * Copyright (C) 2013 Karl Herrick <me@karlherrick.com>
 *
 * This program is a JavaScript port of pwgen.
 * The original C source code written by Theodore Ts'o.
 * <http://sourceforge.net/projects/pwgen/>
 * 
 * This file may be distributed under the terms of the GNU General
 * Public License.
 *
 * Original found at http://8-p.info/pwgen/pwgen.js
 * Modified by Karl Herrick, http://karlherrick.com.
 */
 
// constructor
module.exports = function() {
	this.maxLength = 8;
	this.includeCapitalLetter = false;
	this.includeNumber = false;	
}

// properties and methods
module.exports.prototype = {
	generate0: function() {
		var result = "";
		var prev = 0;
		var isFirst = true;
		
		var requested = 0;
		if (this.includeCapitalLetter) {
			requested |= this.INCLUDE_CAPITAL_LETTER;
		}
		
		if (this.includeNumber) {
			requested |= this.INCLUDE_NUMBER;
		}
		
		var shouldBe = (Math.random() < 0.5) ? this.VOWEL : this.CONSONANT;
		
		while (result.length < this.maxLength) {
			i = Math.floor((this.ELEMENTS.length - 1) * Math.random());
			str = this.ELEMENTS[i][0];
			flags = this.ELEMENTS[i][1];
	
			// Filter on the basic type of the next element
			if ((flags & shouldBe) == 0)
				continue;
			// Handle the NOT_FIRST flag
			if (isFirst && (flags & this.NOT_FIRST))
				continue;
			// Don't allow VOWEL followed a Vowel/Dipthong pair
			if ((prev & this.VOWEL) && (flags & this.VOWEL) && (flags & this.DIPTHONG))
				continue;
			// Don't allow us to overflow the buffer
			if (result.length + str.length > this.maxLength)
				continue;
			
			if (requested & this.INCLUDE_CAPITAL_LETTER) {
				if ((isFirst || (flags & this.CONSONANT)) &&
					(Math.random() > 0.3)) {
					str = str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
					requested &= ~this.INCLUDE_CAPITAL_LETTER;
				}
			}
			
			// OK, we found an element which matches our criteria, let's do it!
			result += str;
			
			
			if (requested & this.INCLUDE_NUMBER) {
				if (!isFirst && (Math.random() < 0.3)) {
					result += Math.floor(10 * Math.random()).toString();
					requested &= ~this.INCLUDE_NUMBER;
					isFirst = true;
					prev = 0;
					shouldBe = (Math.random() < 0.5) ? this.VOWEL : this.CONSONANT;
					continue;
				}
			}
			
			// OK, figure out what the next element should be
			if (shouldBe == this.CONSONANT) {
				shouldBe = this.VOWEL;
			} else { // should_be == VOWEL
				if ((prev & this.VOWEL) ||
					(flags & this.DIPTHONG) || (Math.random() > 0.3)) {
					shouldBe = this.CONSONANT;
				} else {
					shouldBe = this.VOWEL;
				}
			}
			prev = flags;
			isFirst = false;
		}
		
		if (requested & (this.INCLUDE_NUMBER | this.INCLUDE_CAPITAL_LETTER))
			return null;

		//bug occurs if this.includeNumber = true. Passwords can ouput one character
		//longer then the maxLength specified. Return null and retry the password
		//generation if this happens. Should nail down why this happens rather than simply
		//returning null
		
		if (result.length > this.maxLength)
			return null;
		
		return result;
	},
	
	generate: function() {
		var result = null;
	
		while (! result)
			result = this.generate0();
		
		return result;
	},
	
	INCLUDE_NUMBER: 1,
	INCLUDE_CAPITAL_LETTER: 1 << 1,
	
	CONSONANT: 1,
	VOWEL:     1 << 1,
	DIPTHONG:  1 << 2,
	NOT_FIRST: 1 << 3
};

module.exports.prototype.ELEMENTS = [
	[ "a",  module.exports.prototype.VOWEL ],
	[ "ae", module.exports.prototype.VOWEL | module.exports.prototype.DIPTHONG ],
	[ "ah", module.exports.prototype.VOWEL | module.exports.prototype.DIPTHONG ],
	[ "ai", module.exports.prototype.VOWEL | module.exports.prototype.DIPTHONG ],
	[ "b",  module.exports.prototype.CONSONANT ],
	[ "c",  module.exports.prototype.CONSONANT ],
	[ "ch", module.exports.prototype.CONSONANT | module.exports.prototype.DIPTHONG ],
	[ "d",  module.exports.prototype.CONSONANT ],
	[ "e",  module.exports.prototype.VOWEL ],
	[ "ee", module.exports.prototype.VOWEL | module.exports.prototype.DIPTHONG ],
	[ "ei", module.exports.prototype.VOWEL | module.exports.prototype.DIPTHONG ],
	[ "f",  module.exports.prototype.CONSONANT ],
	[ "g",  module.exports.prototype.CONSONANT ],
	[ "gh", module.exports.prototype.CONSONANT | module.exports.prototype.DIPTHONG | module.exports.prototype.NOT_FIRST ],
	[ "h",  module.exports.prototype.CONSONANT ],
	[ "i",  module.exports.prototype.VOWEL ],
	[ "ie", module.exports.prototype.VOWEL | module.exports.prototype.DIPTHONG ],
	[ "j",  module.exports.prototype.CONSONANT ],
	[ "k",  module.exports.prototype.CONSONANT ],
	[ "l",  module.exports.prototype.CONSONANT ],
	[ "m",  module.exports.prototype.CONSONANT ],
	[ "n",  module.exports.prototype.CONSONANT ],
	[ "ng", module.exports.prototype.CONSONANT | module.exports.prototype.DIPTHONG | module.exports.prototype.NOT_FIRST ],
	[ "o",  module.exports.prototype.VOWEL ],
	[ "oh", module.exports.prototype.VOWEL | module.exports.prototype.DIPTHONG ],
	[ "oo", module.exports.prototype.VOWEL | module.exports.prototype.DIPTHONG],
	[ "p",  module.exports.prototype.CONSONANT ],
	[ "ph", module.exports.prototype.CONSONANT | module.exports.prototype.DIPTHONG ],
	[ "qu", module.exports.prototype.CONSONANT | module.exports.prototype.DIPTHONG],
	[ "r",  module.exports.prototype.CONSONANT ],
	[ "s",  module.exports.prototype.CONSONANT ],
	[ "sh", module.exports.prototype.CONSONANT | module.exports.prototype.DIPTHONG],
	[ "t",  module.exports.prototype.CONSONANT ],
	[ "th", module.exports.prototype.CONSONANT | module.exports.prototype.DIPTHONG],
	[ "u",  module.exports.prototype.VOWEL ],
	[ "v",  module.exports.prototype.CONSONANT ],
	[ "w",  module.exports.prototype.CONSONANT ],
	[ "x",  module.exports.prototype.CONSONANT ],
	[ "y",  module.exports.prototype.CONSONANT ],
	[ "z",  module.exports.prototype.CONSONANT ],
];	
