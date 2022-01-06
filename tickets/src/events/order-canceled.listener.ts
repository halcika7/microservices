import { Listener, OrderStatus, Subject } from '@halcika-micro/common';
import { TicketRepository } from '@repository/ticket.repository';
import { Message, Stan } from 'node-nats-streaming';

import { TicketUpdatedPublisher } from './ticket-upated.publisher';

interface Event {
  subject: Subject.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}

export class OrderCancelledListener extends Listener<Event> {
  private readonly ticketRepo = TicketRepository.instance;
  private readonly publisher: TicketUpdatedPublisher;

  constructor(client: Stan) {
    super(client, Subject.OrderCancelled, 'tickets-service');
    this.publisher = new TicketUpdatedPublisher(client);
  }

  async onMessage(data: Event['data'], msg: Message) {
    const ticket = await this.ticketRepo.getById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: undefined });

    await ticket.save();

    this.publisher.publish(ticket);

    msg.ack();
  }

  listen() {
    return super.listen();
  }
}
