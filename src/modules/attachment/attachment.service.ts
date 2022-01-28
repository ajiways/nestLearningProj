import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentsRepository: Repository<Attachment>,
  ) {}

  async findAll() {
    const result = await this.attachmentsRepository.find();

    if (result.length === 0) {
      throw new HttpException('Nothing was found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findOne(id: number) {
    const result = await this.attachmentsRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        'Attachment with the provided id was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
