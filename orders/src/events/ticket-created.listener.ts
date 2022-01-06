import { Listener, Subject } from '@halcika-micro/common';
import { TicketRepository } from '@repository/ticket.repository';
import { Message, Stan } from 'node-nats-streaming';

interface Event {
  subject: Subject.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}

export class TicketCreatedListener extends Listener<Event> {
  private readonly ticketRepo = TicketRepository.instance;

  constructor(client: Stan) {
    super(client, Subject.TicketCreated, 'orders-service');
  }

  async onMessage(data: Event['data'], msg: Message) {
    await this.ticketRepo.createTicket({
      _id: data.id,
      title: data.title,
      price: data.price,
    });

    msg.ack();
  }

  listen() {
    return super.listen();
  }
}
