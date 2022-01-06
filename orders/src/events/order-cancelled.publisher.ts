import { Publisher, Subject } from '@halcika-micro/common';
import { Stan } from 'node-nats-streaming';

interface OrderCancelledEvent {
  subject: Subject.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  constructor(client: Stan) {
    super(client, Subject.OrderCancelled);
  }

  publish(data: OrderCancelledEvent['data']) {
    return super.publish(data);
  }
}
