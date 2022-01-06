import { Publisher, Subject } from '@halcika-micro/common';
import { Stan } from 'node-nats-streaming';

interface Ticket {
  subject: Subject.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}

export class TicketUpdatedPublisher extends Publisher<Ticket> {
  constructor(client: Stan) {
    super(client, Subject.TicketUpdated);
  }

  publish(data: Ticket['data']) {
    return super.publish(data);
  }
}
