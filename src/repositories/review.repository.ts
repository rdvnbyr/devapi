import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Review, ReviewRelations} from '../models';

export class ReviewRepository extends DefaultCrudRepository<Review, typeof Review.prototype.id, ReviewRelations> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Review, dataSource);

    this.modelClass.observe('before save', async ctx => {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = new Date().toISOString();
      } else {
        ctx.instance.updatedAt = new Date().toISOString();
      }
    });
  }
}
