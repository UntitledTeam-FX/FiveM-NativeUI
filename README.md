# FiveM-NativeUI
This project is a (fully TypeScript compatible) port of RageMP-NativeUI [Kar](https://github.com/karscopsandrobbers/RAGEMP-NativeUI) for FiveM. It provides a simple way to use NativeUI menus in your clientside scripts. A lot of credits to [datWeazel](https://github.com/datWeazel/alt-V-NativeUI) who made the initial port of the RageMP-NativeUI.

## Usage:
### With bundler:
1. Create in your `package.json` location a file named `.npmrc` and add this line:
    ```
    @pichotm:registry=https://npm.pkg.github.com
    ```
2. Install by run `npm install --save @pichotm/fivem-nativeui`.
3. Add this line to top of file where you want to use NativeUI.
    ```typescript
    import * as NativeUI from "@pichotm/fivem-nativeui";
    ```
### Without bundler:
1. Download `.zip` archive you want from [releases page](https://github.com/PichotM/FiveM-NativeUI/releases).
2. Unpack archive in client's folder, and import like any other file:
    ```javascript
   # nativeui-min
   import * as NativeUI from "nativeui/nativeui.min.js";
   # nativeui
   import * as NativeUi from "nativeui/nativeui.js";
    ```
   - __Don't forget include nativeui folder in `client_scripts` section of your `fxmanifest.lua`__


## Example Menu
```
examples\nativeUI-example
```
**Result:**  
![Result](http://i.pichotm.fr/batman/don/pasta/987e3530-0f2b-40d6-be04-c860ddb5c33a.png)