import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Review extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'string',
    default: "",
  })
  title?: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  created_at?: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  likes?: string[];

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  dont_likes?: string[];

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  mentions?: object[];

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  reports?: object[];

  @property({
    type: 'string',
  })
  is_reported?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  is_prevented?: boolean;

  @property({
    type: 'object',
    default: null,
  })
  prevention?: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // describe navigational properties here
}

export type ReviewWithRelations = Review & ReviewRelations;
