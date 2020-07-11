export default class Common {
    public static PlaySound(audioName: string, audioRef: string) {
        PlaySound(-1, audioName, audioRef, false, 0, true);
    }
}
