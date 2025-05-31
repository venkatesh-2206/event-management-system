import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) { }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new BadRequestException('Event not found');
    return event;
  }

  async createEvent(input: CreateEventInput, userId: number): Promise<Event> {
    const inputDate = new Date(input.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (inputDate <= now) {
      throw new BadRequestException('Date must be in the future');
    }
    const event = this.eventRepository.create({
      ...input,
      createdBy: userId.toString(),
      date: new Date(input.date),
    });
    return this.eventRepository.save(event);
  }

  async updateEvent(input: UpdateEventInput, userId: string): Promise<Event> {
    const { id, title, description, date } = input;

    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.createdBy !== userId) {
      throw new UnauthorizedException('You are not allowed to update this event');
    }

    if (date) {
      const eventDate = new Date(date);
      if (isNaN(eventDate.getTime()) || eventDate <= new Date()) {
        throw new BadRequestException('Date must be a valid future date');
      }
      event.date = eventDate;
    }
    if (title) {
      event.title = title;
    }
    if (description) {
      event.description = description;
    }
    await this.eventRepository.save(event);

    return event;
  }

  async search(title?: string, date?: string): Promise<Event[]> {
    const where: any = {};

    if (title) {
      where.title = ILike(`%${title}%`);
    }
    if (date) {
      where.date = MoreThanOrEqual(date);
    }

    return this.eventRepository.find({ where })
  }

}
