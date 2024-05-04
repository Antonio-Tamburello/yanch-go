type CardType =
'text-bg-primary'
| 'text-bg-secondary'
| 'text-bg-success'
| 'text-bg-danger'
| 'text-bg-warning'
| 'text-bg-info'
| 'text-bg-light'
| 'text-bg-dark'
| 'border-primary'
| 'border-secondary'
| 'border-success'
| 'border-danger'
| 'border-warning'
| 'border-info'
| 'border-light'
| 'border-dark';

export interface CardModel {
  cardCustomClass?: string;
  cardType?: CardType; 
  cardBodyCustomClass?: string;

}
