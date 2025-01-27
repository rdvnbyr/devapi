import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, ReferencesManyAccessor, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Places, User, UserRelations} from '../models';
import {PlacesRepository} from './places.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
  public readonly places: ReferencesManyAccessor<Places, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PlacesRepository') protected placesRepositoryGetter: Getter<PlacesRepository>,
  ) {
    super(User, dataSource);
    this.places = this.createReferencesManyAccessorFor('places', placesRepositoryGetter);
    this.registerInclusionResolver('places', this.places.inclusionResolver);
  }
}
