import { OrderStatus, Publisher, Subject } from '@halcika-micro/common';
import { Stan } from 'node-nats-streaming';

interface OrderCreatedEvent {
  subject: Subject.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  constructor(client: Stan) {
    super(client, Subject.OrderCreated);
  }

  publish(data: OrderCreatedEvent['data']) {
    return super.publish(data);
  }
}
