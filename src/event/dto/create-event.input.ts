import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsDateString } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  @IsDateString()
  date: string;
}