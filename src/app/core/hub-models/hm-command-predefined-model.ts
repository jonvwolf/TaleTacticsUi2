export const checkIfHmCommandPredefinedModel = (obj:any): obj is HmCommandPredefinedModel => {
    return obj && ('clearScreen' in obj || 'stopSoundEffects' in obj || 'stopBgm' in obj);
};

export interface HmCommandPredefinedModel {
    clearScreen?:boolean,
    stopSoundEffects?:boolean,
    stopBgm?:boolean
}
