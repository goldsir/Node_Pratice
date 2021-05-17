import { Module } from '@nestjs/common';
import { BetDataController } from './bet-data.controller';

@Module({
  controllers: [BetDataController]
})
export class JiLiFishingModule {}
