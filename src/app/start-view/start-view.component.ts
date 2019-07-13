import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Maximum amount of pairs: 14 pairs => 4 to 28 cards.
 */
const MAX_AMOUNT_PAIRS = 14;

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {
  /**
   * The options to choose for amount of cards on the board.
   */
  @Input() cardAmounts: number[];

  playerOneFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  playerTwoFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  cardAmountFormControl = new FormControl(16, [
    Validators.required,
  ]);

  matcher = new FormErrorStateMatcher();

  constructor(private router: Router) {
    this.cardAmounts = [];
    for (let index = 1; index <= MAX_AMOUNT_PAIRS; index++) {
      this.cardAmounts.push((index + 1) * 2);
    }
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(this.playerOneFormControl.value); // TODO remove
    this.router.navigate(['/board'], {
      state: {
        data: {
          playerOne: this.playerOneFormControl.value,
          playerTwo: this.playerTwoFormControl.value,
          cardPairs: this.cardAmountFormControl.value / 2,
        }
      }
    });
  }

}
