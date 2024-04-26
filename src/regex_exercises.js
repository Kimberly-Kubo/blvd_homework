const regexes = {
  canadianPostalCode:
    /^([A-CEGHJ-NPR-TVX-Y][0-9][A-CEGHJ-NPR-TV-Z][ ][0-9][A-CEGHJ-NPR-TV-Z][0-9])$/,
  visa: /^4(\d{12}|\d{15})$/,
  masterCard:
    /^(5[1-5]\d{14}$)|(2((2((2[1-9])|([3-9]\d)))|([3-6]\d\d)|(7[2-9]\d))\d{12}$)/,
  notThreeEndingInOO: /^(?!\p{L}*[o]{2}$)\p{L}*$/iu,
  divisibleBy16: /^(0{1,3}|^[01]*0{4,})$/,
  eightThroughThirtyTwo: /^([89]|([12]\d)|(3[0-2]))$/,
  notPythonPycharmPyc: /^(?!(python|pycharm|pyc)$).*$/u,
  restrictedFloats: /^\d*(.\d*)?[eE][+-]?\d{1,3}$/i,
  palindromes2358:
    /^(([abc])\2|([abc])[abc]\3|([abc])([abc])[abc]\5\4|([abc])([abc])([abc])([abc])\9\8\7\6)$/,
  pythonStringLiterals:
    /^([ruf]|fr|rf)?('([^'\n\\]|\\.)*'|"([^"\n\\]|\\.)*"|'''('(?!'')|[^'\n\\]|\\.)*'''|"""("(?!"")|[^"\n\\]|\\.)*""")$/i,
};

export function matches(name, string) {
  return regexes[name].test(string);
}
