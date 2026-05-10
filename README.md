# Custom Programming Language for Atari 400/800

Compiler written in Node.js. Tested with [this emulator for Mac](https://www.atarimac.com/atari800macx.php).

## References

.bin is fine, literally just raw machinecode with no header, padded to 2^16 bytes (cartridges are typically 2^13 bytes, i.e. $0000 to $4000)

atari programming guidebook: https://www.atariarchives.org/agagd/

hardware manual: https://www.atarimania.com/documents/atari-400-800-hardware-manual.pdf

some tutorials: https://www.chibiakumas.com/6502/Atari800Atari5200.php

6502 instruction set reference: https://www.masswerk.at/6502/6502_instruction_set.html