# Text Animation Frames

__Problem__: A [diff utility] does not provide enough information to animate an
arbitrary text transformation.  For example, if a character `a` is removed and
another character `b` is added, a special utility is required to specify that
`a` was moved to `b`.

_inspired by [threading-macros.info] and built to better demonstrate [parinfer]_

[diff utility]:https://en.wikipedia.org/wiki/Diff_utility
[threading-macros.info]:https://github.com/oakmac/threading-macros.info
[parinfer]:https://github.com/shaunlebron/parinfer

This utility allows you to specify text frames with annotations.
