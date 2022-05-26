import { Module, HttpModule } from '@nestjs/common';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import dsc = require('nest-discord-module');


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/berufs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  dsc.DiscordModule.register("my-secret-token"),
  ScheduleModule.forRoot(),
  HttpModule,
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
],
  providers: [AppService],
})
export class AppModule {}
