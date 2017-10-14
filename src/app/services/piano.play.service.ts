import { PianoKeyComponent } from '../components/piano-key/piano-key.component';
import { Inject, Injectable, keyframes } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

// This service binds the keydown and keyup keys, and allows playing the keyboard using the 1 - 9 upper numeric keys.
@Injectable()
export class PianoPlayService {
    // The piano keys are being added by the order they appear on the screen
    pianoKeys:PianoKeyComponent[] = [];

    // The keycodes (1 - 9) we expect from the user to play on the piano
    startKeycode = 49;
    endKeycode = 57;

    constructor( @Inject(DOCUMENT) private document: any) {
        this.document.addEventListener('keydown', this.onKeydown.bind(this));
        this.document.addEventListener('keyup', this.onKeyup.bind(this));
    }

    // Returns the associated piano key with this key
    getAssociatedPianoKey(event: KeyboardEvent):PianoKeyComponent {
        let keycode = event.keyCode;
        
        if (keycode >= this.startKeycode && keycode <= this.endKeycode)
            return this.pianoKeys[(this.endKeycode - this.startKeycode) - (this.endKeycode - keycode)];

        return null;
    }

    // Registers a piano key (each piano key component calls this method)
    registerPianoKey(key: PianoKeyComponent) {
        this.pianoKeys.push(key);
    }

    // When a user pressed on a key related to one of the piano keys, we play it's sound
    onKeydown(event: KeyboardEvent) {
        let keyToPlay = this.getAssociatedPianoKey(event);
        if (keyToPlay) keyToPlay.onPianoKeyDown(event);
    }

    // When a user released a key related to one of the piano keys, we release it
    onKeyup(event: KeyboardEvent) {
        let keyToPlay = this.getAssociatedPianoKey(event);
        if (keyToPlay) keyToPlay.onPianoKeyUp(event);
    }
}
