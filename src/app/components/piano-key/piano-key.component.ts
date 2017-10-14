import { Component, OnInit, Input } from '@angular/core';
import { PianoPlayService } from '../../services/piano.play.service';

// A single piano key which is able to be played via the mouse or using the keys
@Component({
  selector: 'app-piano-key',
  templateUrl: './piano-key.component.html',
  styleUrls: ['./piano-key.component.css']
})
export class PianoKeyComponent implements OnInit {
  get sharpKey() { return !this.note || this.note.endsWith("#"); }
  get keyName(): string { return `${this.note}${this.index}` };
  get pianoSoundUrl(): string { return `assets/piano_sounds/${this.note.replace("#", "-")}${this.index}.mp3` };

  @Input() note: string;
  @Input() index: number;

  isActive: boolean = false;
  noteSound = null;

  constructor(private pianoService: PianoPlayService) { }

  ngOnInit() {
    // We register this keys using the piano service so we can play it using the keyboard
    this.pianoService.registerPianoKey(this);
  }

  // Load the sounds async after the view has been rendered
  ngAfterViewChecked() {
    this.noteSound = new Audio();
    this.noteSound.src = this.pianoSoundUrl;
    this.noteSound.load();
  }

  onPianoKeyDown(event: Event) {
    if (event) event.preventDefault();

    if (this.noteSound) this.noteSound.play();
    this.isActive = true;
  }

  onPianoKeyUp(event: Event) {
    if (event) event.preventDefault();
    this.isActive = false;
  }
}
