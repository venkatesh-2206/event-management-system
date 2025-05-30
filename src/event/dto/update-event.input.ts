import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateEventInput } from './create-event.input';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => ID)   // This tells GraphQL to treat id as ID, not Float
  id: number;
}