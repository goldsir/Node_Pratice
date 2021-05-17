import { Controller, Get, Query, Logger, Req, Param } from '@nestjs/common';
import { Common } from 'src/util';

@Controller('wrv/jiliFishing/bet-data')
export class BetDataController {

    @Get()
    public Index() {
        return Common.readHtml('./html/jiliFishing.html');
    }
}
