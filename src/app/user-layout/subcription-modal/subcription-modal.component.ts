import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plan } from '../../models/SubscriptionPlan/plan';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-modal',
  imports: [CommonModule],
  templateUrl: './subcription-modal.component.html',
  styleUrl: './subcription-modal.component.css'
})
export class SubcriptionModalComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.plans);
  }
  @Input() plans: Plan[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() purchase = new EventEmitter<Plan>();

  select(plan: Plan) { this.purchase.emit(plan); }
}
