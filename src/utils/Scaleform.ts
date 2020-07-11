export default class Scaleform {
    private _handle: number = 0;
    private scaleForm: string;

    public constructor(scaleForm: string) {
        this.scaleForm = scaleForm;
        this._handle = RequestScaleformMovie(this.scaleForm);
    }

    public get handle(): number {
        return this._handle;
    }

    public get isValid(): boolean {
        return this._handle != 0;
    }

    public get isLoaded(): boolean {
        return HasScaleformMovieLoaded(this._handle) === 1;
    }

    private callFunctionHead(funcName: string, ...args: any[]): void {
        if (!this.isValid || !this.isLoaded)
            return;

        BeginScaleformMovieMethod(this._handle, funcName);

        args.forEach((arg: any) => {
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
                        ScaleformMovieMethodAddParamPlayerNameString(arg as string);
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

    public callFunction(funcName: string, ...args: any[]): void {
        this.callFunctionHead(funcName, ...args);
        EndScaleformMovieMethod();
    }

    public callFunctionReturn(funcName: string, ...args: any[]): number {
        this.callFunctionHead(funcName, ...args);
        return EndScaleformMovieMethodReturnValue();
    }

    public render2D(): void {
        if (!this.isValid || !this.isLoaded)
            return;
        DrawScaleformMovieFullscreen(this._handle, 255, 255, 255, 255, 0);
    }

    public recreate(): void {
        if (!this.isValid || !this.isLoaded)
            return;
        SetScaleformMovieAsNoLongerNeeded(this._handle);
        this._handle = RequestScaleformMovie(this.scaleForm);
    }

    public destroy(): void {
        if (!this.isValid)
            return;
        SetScaleformMovieAsNoLongerNeeded(this._handle);
        this._handle = 0;
    }
}