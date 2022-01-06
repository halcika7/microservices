import { Listener, OrderStatus, Subject } from '@halcika-micro/common';
import { TicketRepository } from '@repository/ticket.repository';
import { Message, Stan } from 'node-nats-streaming';

import { TicketUpdatedPublisher } from './ticket-upated.publisher';

interface Event {
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

export class OrderCreatedListener extends Listener<Event> {
  private readonly ticketRepo = TicketRepository.instance;
  private readonly publisher: TicketUpdatedPublisher;

  constructor(client: Stan) {
    super(client, Subject.OrderCreated, 'tickets-service');
    this.publisher = new TicketUpdatedPublisher(client);
  }

  async onMessage(data: Event['data'], msg: Message) {
    const ticket = await this.ticketRepo.getById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: data.id });

    await ticket.save();

    this.publisher.publish(ticket);

    msg.ack();
  }

  listen() {
    return super.listen();
  }
}
