export interface Invoice {
    id: number;
    items: string[];
    quantities: number[];
    prices: number[];
    paymentStatus: PaymentStatus;
    paymentType: PaymentType;
  }

  export enum PaymentStatus {
    Paid = 'Paid',
    Pending = 'Pending',
    Unpaid = 'Unpaid'
  }

  export enum PaymentType {
    CreditCard = 'Credit Card',
    BankTransfer = 'Bank Transfer',
    PayPal = 'PayPal',
    Cash = 'Cash',
    DebitCard = 'Debit Card'
  }