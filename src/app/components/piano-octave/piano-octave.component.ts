import { Component, OnInit, Input } from '@angular/core';

// A single piano octave with it's associated keys
@Component({
  selector: 'app-piano-octave',
  templateUrl: './piano-octave.component.html',
  styleUrls: ['./piano-octave.component.css']
})
export class PianoOctaveComponent implements OnInit {
  @Input() octaveIndex = 0;
  octaveNotes = [ "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

  constructor() { }

  ngOnInit() {

  }
}
