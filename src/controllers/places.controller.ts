import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Places} from '../models';
import {PlacesRepository} from '../repositories';

export class PlacesController {
  constructor(
    @repository(PlacesRepository)
    public placesRepository: PlacesRepository,
  ) {}

  @post('/places')
  @response(200, {
    description: 'Places model instance',
    content: {'application/json': {schema: getModelSchemaRef(Places)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Places, {
            title: 'NewPlaces',
            exclude: ['id'],
          }) || [getModelSchemaRef(Places, {exclude: ['id']})],
        },
      },
    })
    places: Omit<Places, 'id'> | Omit<Places, 'id'>[],
  ): Promise<Places | Places[]> {
    if (Array.isArray(places)) {
      return Promise.all(places.map(place => this.placesRepository.create(place)));
    }
    return this.placesRepository.create(places);
  }

  @get('/places/count')
  @response(200, {
    description: 'Places model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Places) where?: Where<Places>): Promise<Count> {
    return this.placesRepository.count(where);
  }

  @get('/places')
  @response(200, {
    description: 'Array of Places model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Places, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Places) filter?: Filter<Places>): Promise<Places[]> {
    return this.placesRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/places')
  @response(200, {
    description: 'Places PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Places, {partial: true}),
        },
      },
    })
    places: Places,
    @param.where(Places) where?: Where<Places>,
  ): Promise<Count> {
    return this.placesRepository.updateAll(places, where);
  }

  @get('/places/{id}')
  @response(200, {
    description: 'Places model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Places, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Places, {exclude: 'where'}) filter?: FilterExcludingWhere<Places>,
  ): Promise<Places> {
    return this.placesRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/places/{id}')
  @response(204, {
    description: 'Places PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Places, {partial: true}),
        },
      },
    })
    places: Places,
  ): Promise<void> {
    await this.placesRepository.updateById(id, places);
  }

  @authenticate('jwt')
  @put('/places/{id}')
  @response(204, {
    description: 'Places PUT success',
  })
  async replaceById(@param.path.string('id') id: string, @requestBody() places: Places): Promise<void> {
    await this.placesRepository.replaceById(id, places);
  }

  @authenticate('jwt')
  @del('/places/{id}')
  @response(204, {
    description: 'Places DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.placesRepository.deleteById(id);
  }
}
