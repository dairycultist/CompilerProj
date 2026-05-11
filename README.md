# Custom Programming Language for Atari 400/800

Compiler written in Node.js. Tested with [this emulator for Mac](https://www.atarimac.com/atari800macx.php).

## References

.bin is fine, literally just raw machinecode with no header, padded to 2^16 bytes, cartridges are either 2^13 bytes ($A000-BFFF) or 2^14 bytes ($8000-BFFF)

In a cartridge, the first 2 bytes are the start address, and the following 2 bytes are where to start the cartridge in memory.

atari programming guidebook: https://www.atariarchives.org/agagd/

atari memory map: https://atariwiki.org/wiki/Wiki.jsp?page=Memory%20Map

hardware manual: https://www.atarimania.com/documents/atari-400-800-hardware-manual.pdf

technical reference: https://www.atarimania.com/documents/atari-800-technical-reference-notes.pdf

some tutorials: https://www.chibiakumas.com/6502/Atari800Atari5200.php

6502 instruction set reference: https://www.masswerk.at/6502/6502_instruction_set.html