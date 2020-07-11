import {resolve} from "path";
import typescript from "rollup-plugin-typescript2";
import {terser} from "rollup-plugin-terser";

const input = resolve(__dirname, "src/NativeUi.ts");

const file = () => {
    const path = `dist/nativeui/nativeui.js`
    return {
        file: resolve(__dirname, path),
        name: "NativeUI",
        format: "es",
        plugins: [ terser() ]
    }
}

export default {
    input,
    output: [
        file()
    ],
    external: ["@citizenfx/client"],
    plugins: [
        typescript({ abortOnError: false})
    ]
}; 