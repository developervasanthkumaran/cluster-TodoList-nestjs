import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { UsersController } from './users/users.controller';
import { AuthController } from './authentication/auth/auth.controller';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UsersModule,AuthenticationModule,MongooseModule.forRoot('mongodb://localhost:27017/cluster-users',
  {useFindAndModify:false,useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true})],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {

}
