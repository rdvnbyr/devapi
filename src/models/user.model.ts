import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    jsonSchema: {
      uniqueItems: true,
      errorMessage: {
        uniqueItems: 'User name already exists',
      },
    },
  })
  username?: string;

  @property({
    type: 'string',
    jsonSchema: {
      minLength: 3,
      maxLength: 240,
      default: '',
    },
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['active', 'inactive', 'first_login', 'terminated'],
    },
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    hidden: true,
    jsonSchema: {
      minLength: 8,
      errorMessage: {
        minLength: 'Password is too short',
      },
    },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['admin', 'user'],
      default: 'user',
    },
  })
  role: string;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
