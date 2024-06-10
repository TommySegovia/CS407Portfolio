import { Audio, AudioListener, AudioLoader, PerspectiveCamera } from 'three';

function createFootstepsSound(listener: AudioListener, audioLoader: AudioLoader) {
    const sound = new Audio(listener);
    
    audioLoader.load('sounds/footsteps_in_snow.wav', (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(1);
    });
    return sound;
}

function createAmbient(listener: AudioListener, audioLoader: AudioLoader) {
    const sound = new Audio(listener);
    
    audioLoader.load('sounds/ambient.wav', (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.2);
    });
    return sound;
}

export { createFootstepsSound, createAmbient};