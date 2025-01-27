import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Places, PlacesRelations} from '../models';

export class PlacesRepository extends DefaultCrudRepository<Places, typeof Places.prototype.id, PlacesRelations> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Places, dataSource);

    this.modelClass.observe('before save', async ctx => {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = new Date().toISOString();
      } else {
        ctx.instance.updatedAt = new Date().toISOString();
      }
    });
  }
}
