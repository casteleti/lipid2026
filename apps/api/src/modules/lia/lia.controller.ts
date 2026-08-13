import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LiaService } from './lia.service';
import { ChatRequestDto } from './dto/chat.dto';
import { LiaRateLimitGuard } from './lia-rate-limit.guard';

@Controller('lia')
export class LiaController {
  constructor(private readonly service: LiaService) {}

  @Post('chat')
  @UseGuards(LiaRateLimitGuard)
  chat(@Body() dto: ChatRequestDto) {
    return this.service.chat(dto.messages);
  }
}
