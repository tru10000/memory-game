import { Component, Input, OnInit  } from '@angular/core';
import { Card, CardState, CardVisibility } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  imagePath = '';

  @Input() card: Card = { pairId: -1, version: 'a', name: '', filename: '', state: CardState.unsolved, visibility: CardVisibility.closed, animate: '' };

  ngOnInit() {
    this.imagePath = `/assets/photos/${this.card.filename}`;
  }
}
