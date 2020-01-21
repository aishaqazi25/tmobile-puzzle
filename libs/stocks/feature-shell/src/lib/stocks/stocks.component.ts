import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';

const API_MAX = 'max';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;

  today: Date = new Date();
  maxDate: Date = new Date();

  formSubscription: Subscription;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.formSubscription = this.stockPickerForm.valueChanges.subscribe(form => {
      const { symbol, startDate, endDate } = this.stockPickerForm.value;
      if (endDate && endDate < this.today) {
        this.maxDate = endDate;
      }
      if (this.stockPickerForm.valid) {
        this.fetchQuote(symbol, startDate, endDate);
      }
    });
  }
  fetchQuote(symbol, startDate, endDate) {
    this.priceQuery.fetchQuote(symbol, API_MAX, startDate, endDate);
  }
  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
