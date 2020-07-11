export default class Scaleform {
    constructor(scaleForm) {
        this._handle = 0;
        this.scaleForm = scaleForm;
        this._handle = RequestScaleformMovie(this.scaleForm);
    }
    get handle() {
        return this._handle;
    }
    get isValid() {
        return this._handle != 0;
    }
    get isLoaded() {
        return HasScaleformMovieLoaded(this._handle);
    }
    callFunctionHead(funcName, ...args) {
        if (!this.isValid || !this.isLoaded)
            return;
        BeginScaleformMovieMethod(this._handle, funcName);
        args.forEach((arg) => {
            switch (typeof arg) {
                case "number":
                    {
                        if (Number(arg) === arg && arg % 1 !== 0) {
                            ScaleformMovieMethodAddParamFloat(arg);
                        }
                        else {
                            ScaleformMovieMethodAddParamInt(arg);
                        }
                    }
                case "string":
                    {
                        ScaleformMovieMethodAddParamPlayerNameString(arg);
                        break;
                    }
                case "boolean":
                    {
                        ScaleformMovieMethodAddParamBool(arg);
                        break;
                    }
                default:
                    {
                        console.log(`Unknown argument type ${typeof arg} = ${arg.toString()} passed to scaleform with handle ${this._handle}`);
                    }
            }
        });
    }
    callFunction(funcName, ...args) {
        this.callFunctionHead(funcName, ...args);
        EndScaleformMovieMethod();
    }
    callFunctionReturn(funcName, ...args) {
        this.callFunctionHead(funcName, ...args);
        return EndScaleformMovieMethodReturnValue();
    }
    render2D() {
        if (!this.isValid || !this.isLoaded)
            return;
        DrawScaleformMovieFullscreen(this._handle, 255, 255, 255, 255, 0);
    }
    recreate() {
        if (!this.isValid || !this.isLoaded)
            return;
        SetScaleformMovieAsNoLongerNeeded(this._handle);
        this._handle = RequestScaleformMovie(this.scaleForm);
    }
    destroy() {
        if (!this.isValid)
            return;
        SetScaleformMovieAsNoLongerNeeded(this._handle);
        this._handle = 0;
    }
}
