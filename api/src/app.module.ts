import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.enity';
import { UserController } from './module/user.controller';
import { UserService } from './module/user.service';
import { LoggerMiddleware } from './core/logs.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'rosie.db.elephantsql.com',
      port: 5432,
      username: 'fueitupq',
      password: 'krq19_pLnhRPz5HXo_DFltuUBkelEwUr',
      database: 'fueitupq',
      synchronize: true,
      entities: [User],
    }),

    // Có bao nhiêu entity thêm vô 2 chổ này
    TypeOrmModule.forFeature([User]),
  ],

  controllers: [AppController, UserController],
  
  providers: [AppService, UserService, ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
