import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Event extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    default: "",
  })
  summary?: string;

  @property({
    type: 'date',
    required: true,
  })
  start_at: string;

  @property({
    type: 'date',
    required: true,
  })
  end_at: string;

  @property({
    type: 'string',
    default: "",
  })
  description?: string;

  @property({
    type: 'object',
    default: null,
  })
  location?: object;

  @property({
    type: 'object',
    required: true,
  })
  address: object;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  pricing_status: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  prices: object[];

  @property({
    type: 'object',
    required: true,
  })
  source: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
