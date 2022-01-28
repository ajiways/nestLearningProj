import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';
import { RequestParamsIdGuard } from '../../guards/RequestParamsId.guard';

@Controller('attachments')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get()
  async getAllAttachments(): Promise<Attachment[]> {
    return await this.attachmentService.findAll();
  }

  @Get(':id')
  @UseGuards(RequestParamsIdGuard)
  async getAttachmentById(@Param() params): Promise<Attachment> {
    return await this.attachmentService.findOne(params.id);
  }
}
