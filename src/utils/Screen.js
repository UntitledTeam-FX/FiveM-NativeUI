import game from 'natives';
import Size from "./Size";
import Text from '../modules/Text';
const gameScreen = GetActiveScreenResolution(0, 0);
export default class Screen {
    static get ResolutionMaintainRatio() {
        const ratio = Screen.Width / Screen.Height;
        const width = 1080.0 * ratio;
        return new Size(width, 1080.0);
    }
    static MousePosition(relative = false) {
        const res = Screen.ResolutionMaintainRatio;
        const cursor = GetNuiCursorPosition();
        let [mouseX, mouseY] = [cursor.x, cursor.y];
        if (relative)
            [mouseX, mouseY] = [cursor.x / res.Width, cursor.y / res.Height];
        return {
            X: mouseX,
            Y: mouseY
        };
    }
    static IsMouseInBounds(topLeft, boxSize) {
        const mousePosition = Screen.MousePosition();
        return (mousePosition.X >= topLeft.X &&
            mousePosition.X <= topLeft.X + boxSize.Width &&
            (mousePosition.Y > topLeft.Y && mousePosition.Y < topLeft.Y + boxSize.Height));
    }
    static GetTextWidth(text, font, scale) {
        BeginTextCommandGetWidth("CELL_EMAIL_BCON");
        Text.AddLongString(text);
        SetTextFont(font);
        SetTextScale(1.0, scale);
        const width = EndTextCommandGetWidth(true);
        const res = Screen.ResolutionMaintainRatio;
        return res.Width * width;
    }
    static GetLineCount(text, position, font, scale, wrap) {
        BeginTextCommandLineCount("CELL_EMAIL_BCON");
        Text.AddLongString(text);
        const res = Screen.ResolutionMaintainRatio;
        const x = position.X / res.Width;
        const y = position.Y / res.Height;
        SetTextFont(font);
        SetTextScale(1.0, scale);
        if (wrap > 0) {
            const start = position.X / res.Width;
            const end = start + (wrap / res.Width);
            SetTextWrap(x, end);
        }
        let lineCount = EndTextCommandLineCount(x, y);
        return lineCount;
    }
}
Screen.Width = gameScreen[1];
Screen.Height = gameScreen[2];
