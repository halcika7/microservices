import { Listener, Subject } from '@halcika-micro/common';
import { TicketRepository } from '@repository/ticket.repository';
import { Message, Stan } from 'node-nats-streaming';

interface Event {
  subject: Subject.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    version: number;
  };
}

export class TicketUpdatedListener extends Listener<Event> {
  private readonly ticketRepo = TicketRepository.instance;

  constructor(client: Stan) {
    super(client, Subject.TicketUpdated, 'orders-service');
  }

  async onMessage({ id, price, title, version }: Event['data'], msg: Message) {
    const ticket = await this.ticketRepo.getByIdAndVersion(id, version - 1);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ price, title });

    await ticket.save();

    msg.ack();
  }

  listen() {
    return super.listen();
  }
}
