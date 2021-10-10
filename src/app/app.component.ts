import { Component, OnInit } from '@angular/core';

import { Card, CardState, CardVisibility } from './card';
import { SourceCard } from './source-card';
import { sourceCards } from './mock-card-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  selectedCards: Card[] = [];
  cards: Card[] = [];

  pairCount: number = 12;
  
  solvedCount: number = 0;
  moveCount: number = 0;

  ngOnInit() {
    this.pairCount = sourceCards.length > 12 ? 12 : sourceCards.length;
    this.prepCards();
  }

  cardClick(card: Card): void {
    if (this.selectedCards.length !== 2) {

      if (!this.selectedCards.includes(card)) {
        if (card.visibility === CardVisibility.closed) {
          card.visibility = CardVisibility.opened;
          this.addToSelectedCards(card);
          if (this.selectedCards.length === 2) {
            this.checkForMatch();
          }
        } else if (card.visibility === CardVisibility.opened) {
          card.visibility = CardVisibility.closed;
          this.removeFromSelectedCards(card);
        }
      }
    }
  }

  addToSelectedCards(card: Card): void  {
    this.selectedCards.push(card);
  }

  removeFromSelectedCards(card: Card): void  {
    this.selectedCards.splice(this.selectedCards.indexOf(card), 1);
  }

  clearSelectedCards(): void  {
    this.selectedCards = [];
  }

  setStateSelectedCards(value: CardState): void {
    this.selectedCards[0].state = value;
    this.selectedCards[1].state = value;
  }

  setAnimateSelectedCards(value: string): void {
    this.selectedCards[0].animate = value;
    this.selectedCards[1].animate = value;
  }

  setVisibilitySelectedCards(value: CardVisibility): void {
    this.selectedCards[0].visibility = value;
    this.selectedCards[1].visibility = value;
  }

  gameIsSolved() {
    return this.pairCount === this.solvedCount;
  }

  matchedHandler() {
    this.solvedCount++;
    this.setStateSelectedCards(CardState.success);
    this.setAnimateSelectedCards('animate__bounceOut animate__slow');
    setTimeout (() => {
      this.setVisibilitySelectedCards(CardVisibility.hidden);
      this.setAnimateSelectedCards('animate__fadeIn animate__fast');
      this.clearSelectedCards();
      if (this.gameIsSolved()) {
        this.scrollToTop();
      }
    }, 1600);
  }

  notMatchedHandler() {
    this.setStateSelectedCards(CardState.nomatch);
    setTimeout (() => {
      this.setStateSelectedCards(CardState.unsolved);
      this.setVisibilitySelectedCards(CardVisibility.closed);
      this.setAnimateSelectedCards('');
      this.clearSelectedCards();
    }, 700);
  }

  checkForMatch(): void  {
    this.moveCount++;
    if (this.selectedCards[0].pairId === this.selectedCards[1].pairId) {
      this.matchedHandler();
    } else {
      this.notMatchedHandler();
    }
  }

  formatCard(sourceCard: SourceCard, pairId: number, version: string): Card  {
    return Object.assign({}, sourceCard, { pairId, version, state: CardState.unsolved, visibility: CardVisibility.closed, animate: 'animate__fadeIn' });
  }

  prepCards() {
    const shuffledSourceCards = this.shuffledArr(sourceCards);
    const twelveCards = shuffledSourceCards.slice(0, this.pairCount);
    twelveCards.forEach((sourceCard, pairId) => {
      this.cards.push(this.formatCard(sourceCard, pairId, 'a'));
      this.cards.push(this.formatCard(sourceCard, pairId, 'b'));
    });
    this.cards = this.shuffledArr(this.cards);
  }

  shuffledArr = (array: any[]) => array.sort(() => 0.5 - Math.random());

  resetGame() {
    this.cards = [];
    this.solvedCount = 0;
    this.moveCount = 0;
    this.prepCards();
  }

  scrollToTop() { 
    (function smoothscroll() 
    { var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; 
      if (currentScroll > 0) 
      {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

}
