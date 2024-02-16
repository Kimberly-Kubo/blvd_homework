import * as ohm from "ohm-js";

export function matches(name, s) {
  const grammars = {
    canadianPostalCode: String.raw` G {
        code 				= postalLetterFirst digit postalLetter " " digit postalLetter digit
        postalLetter 		= ~("D"|"F"|"I"|"O"|"Q") "A".."Z"
        postalLetterFirst 	= ~("W"|"Z") postalLetter    
    }`,
    visa: String.raw`G {
        num 			    = "4" d d d d d d d d d d d d additionalNum?
        additionalNum 	    = d d d
        d				    = digit
    }`,
    masterCard: String.raw`G {
        num 		        = option1 | option2
        option1 	        = "5" "1".."5" altSequence
        option2 	        = "2" digits sequence
    
        digits 	            = ("2" ("2" "1".."9" | "3".."9" "0".."9"))	// 221-299
    			            | ("3".."6" "0".."9" "0".."9")			    // 300-699
               	            | ("7" ("0".."1" "0".."9" | "2" "0".."1"))	// 700-721
        sequence 	        = d d d d d d d d d d d d
        altSequence         = sequence d d
        d			        = digit
    }`,
    notThreeEndingInOO: String.raw`G {
        Exp 		        = ~exclude letterCase*
        exclude 	        = letterCase oCase oCase end
        letterCase 	        = lower | upper
        oCase		        = "o" | "O"
    }`,
    divisibleBy16: String.raw`G {
        num                 = binary* "0000"	    -- divisible
                            | "0"+			        -- zero
        binary              = ~("0000" end) "0" | "1"
    }`,
    eightThroughThirtyTwo: String.raw`G {
        num                 = ("8".."9")		    --start
                            | ("1".."2" "0".."9")   --middle
                            | ("3" "0".."2")	    --end
    }`,
    notPythonPycharmPyc: String.raw`G {
        string              = ~keywords letter*
        keywords            = python | pycharm | pyc
        python              = "python" ~letter
        pycharm             = "pycharm" ~letter
        pyc                 = "pyc" ~letter
    }`,
    restrictedFloats: String.raw`G {
        float               = num fractional? exponent
        num                 = digit*
        fractional          = "." digit+
        exponent            = ("e" | "E") ("+" | "-")? digit digit? digit?
    }`,
    palindromes2358: String.raw`G {
        palindrome          = palin8 | palin5 | palin3 | palin2
        palin8              = a palin6 a | b palin6 b | c palin6 c
        palin6              = a palin4 a | b palin4 b | c palin4 c
        palin5              = a palin3 a | b palin3 b | c palin3 c
        palin4              = a palin2 a | b palin2 b | c palin2 c
        palin3              = a letters a | b letters b | c letters c
        palin2              = a a | b b | c c
        letters             = a | b | c
        a                   = "a"
        b                   = "b"
        c                   = "c"
    
    }`,
    pythonStringLiterals: String.raw`G {
        stringLiteral	    = stringPrefix? (longString | shortString)
        stringPrefix	    = "r" | "u" | "R" | "U" | "f" | "F" | "fr" | "Fr" | "fR" | "FR" | "rf" | "rF" | "Rf" | "RF"
        
        shortString	        = "'" shortStringItem1* "'" | "\"" shortStringItem2* "\""
        longString		    = "'''" longStringItem1* "'''" | "\"\"\"" longStringItem2* "\"\"\""
        
        shortStringItem1	= shortStringChar1 | stringEscapeSeq
        shortStringItem2	= shortStringChar2 | stringEscapeSeq
        
        longStringItem1	    = longStringChar1 | stringEscapeSeq
        longStringItem2	    = longStringChar2 | stringEscapeSeq
        
        shortStringChar1	= ~("\\" | "\\n" | "'") sourceChar
        shortStringChar2	= ~("\\" | "\\n" | "\"") sourceChar
        
        longStringChar1	    = ~("\\" | "'''") sourceChar
        longStringChar2	    = ~("\\" | "\"\"\"") sourceChar
        
        stringEscapeSeq	    = "\\" sourceChar
        sourceChar 	    = any
    }`,
  };
  return ohm.grammar(grammars[name]).match(s).succeeded();
}
