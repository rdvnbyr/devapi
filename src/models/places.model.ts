import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Places extends Entity {
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
  title: string;

  @property({
    type: 'string',
    default: '',
  })
  image_src?: string;

  @property({
    type: 'string',
    default: '',
  })
  image_alt?: string;

  @property({
    type: 'number',
    required: true,
  })
  longitute: number;

  @property({
    type: 'number',
    required: true,
  })
  latitute: number;

  @property({
    type: 'string',
    default: '',
  })
  summary?: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  tags?: string[];

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  reviews?: string[];

  @property({
    type: 'date',
    default: new Date().toISOString(),
  })
  created_at?: string;

  @property({
    type: 'date',
    default: new Date().toISOString(),
  })
  updated_at?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Places>) {
    super(data);
  }
}

export interface PlacesRelations {
  // describe navigational properties here
}

export type PlacesWithRelations = Places & PlacesRelations;
