/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  Injectable,
  HttpService,
  OnModuleInit
} from '@nestjs/common';
import {
  Interval
} from '@nestjs/schedule';
import {
  parse
} from 'node-html-parser';
import { User } from './schemas/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class AppService implements OnModuleInit {
  private readonly webHookUrl = "https://discordapp.com/api/webhooks/704965131498553383/h-OBB-j4va11hT4UaVWfQupMGQ1HCpkm08lDK1n0xIsQZKe1eVxI23JmwoqiS2jTZzpF";
  private readonly rankingUlr = "https://new.margonem.pl/ladder/players,Berufs?page=";

  constructor(
    private readonly httpService: HttpService,
    @InjectModel('User') private userModel: Model<User>
    ) {}

  onModuleInit() {
    this.getProfiles();
  }

  getTotalPages(firstPage: string): number {
    const document = parse(firstPage);
    //@ts-ignore
    const totalPages = document.querySelector('.total-pages a').text;
    return parseInt(totalPages, 10);
  }

  async checkSite(page: string) {
    const document = parse(page);
    //@ts-ignore
    const allPlayers: any[] = Array.from(document.querySelectorAll("table tbody tr"));
    for (const player of allPlayers) {
      const [id, charId]: number[] = player.childNodes[3].childNodes[1].rawAttrs.match(/(\d+)/g).map((elem: string)=> parseInt(elem, 10));
      const lvl: number = parseInt(player.childNodes[5].text, 10);
      const nickname: string = player.childNodes[3].text.trim();

      const user = await this.userModel.findOne({ charId });
      if (!user) {
        await this.userModel.create({
          id,
          charId,
          lvl,
          nickname
        });
        continue;
      }

      if (lvl !== user.lvl) {
        if (lvl < user.lvl) {
          await this.httpService.post(this.webHookUrl, {
            content: `${nickname}: ${user.lvl}`
          })
        }
        await this.userModel.updateOne({ charId }, { lvl })
      }
    }
  }

  // @Cron('45 * * * * *')
  // @Cron('*/5 * * * *')
  @Interval(1000*60*5)
  async getProfiles() {
    const {
      data: firstPage
    } = await this.httpService.get < string > (this.rankingUlr + 1).toPromise();
    const totalPages = this.getTotalPages(firstPage);

    for (let i = 1; i <= totalPages; i++) {
      try {
        const {
          data: page
        } = await this.httpService.get < string > (this.rankingUlr + i).toPromise();
        await this.checkSite(page);
        console.log(i);
      } catch {}
    }
  }
}