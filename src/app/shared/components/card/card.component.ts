import { Component, input } from '@angular/core';
import { CardModel } from '../../models/card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  /**
   * Input with card config object.
   */
  cardModel = input<CardModel>();
}
