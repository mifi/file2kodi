# file2kodi
Play a local file on Kodi/XBMC. Send video/music etc.

The script works by setting up a web server sharing the specified file, then sending a command to Kodi to play the file on this server.

# Installation
* Checkout
* npm install
* Edit config.js and add Kodi machine IP, and local IP & listen port
* Remote control must be enabled in Kodi

# Usage
```
node /path/to/file2kodi.js media.mp4
```

# Optional
in bashrc, append:
```
alias file2kodi="node $HOME/path/to/file2kodi.js"
```
