import { Resolver, Query, Mutation, Args, Context, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) { }

  @Query(() => [Event])
  @UseGuards(GqlAuthGuard)
  events() {
    return this.eventService.findAll();
  }

  @Query(() => Event)
  @UseGuards(GqlAuthGuard)
  event(@Args('id', { type: () => ID }) id: number) {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  @UseGuards(GqlAuthGuard)
  async createEvent(
    @Args('input') input: CreateEventInput,
    @Context() context: any
  ): Promise<Event> {
    const userId = context.req.user.userId;
    return this.eventService.createEvent(input, userId);
  }

  @Mutation(() => Event)
  @UseGuards(GqlAuthGuard)
  async updateEvent(
    @Args('input') input: UpdateEventInput,
    @Context() context,
  ): Promise<Event> {
    const userId = String(context.req.user.userId);
    return this.eventService.updateEvent(input, userId);
  }

  @Query(() => [Event])
  @UseGuards(GqlAuthGuard)
  async search(
    @Args('title', { nullable: true }) title?: string,
    @Args('date', { nullable: true }) date?: string,
  ): Promise<Event[]> {
    return this.eventService.search(title, date);
  }

}
