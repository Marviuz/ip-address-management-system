import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Req,
  NotFoundException,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import {
  CreateNetworkAddressPayload,
  UpdateNetworkAddressPayload,
} from '@ip-address-management-system/shared';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { NetworkAddressService } from './network-address.service';

@Controller('network-address')
export class NetworkAddressController {
  constructor(private readonly networkAddressService: NetworkAddressService) {}

  @Post()
  async create(@Req() req: Request, @Body() body: CreateNetworkAddressPayload) {
    const data = await this.networkAddressService.create({
      addedBy: req.user.id,
      label: body.label,
      networkAddress: body.networkAddress,
      comments: body.comments,
    });
    if (!data) throw new Error('Failed to create network address');
    return data;
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    return this.networkAddressService.findAll(page, pageSize);
  }

  @Get(':publicId')
  async findOne(@Param('publicId') publicId: string) {
    const data = await this.networkAddressService.findOne(publicId);
    if (!data) throw new NotFoundException('Network address not found');
    return data;
  }

  @Put(':publicId')
  async update(
    @Param('publicId') publicId: string,
    @Body() body: UpdateNetworkAddressPayload,
  ) {
    const data = await this.networkAddressService.update(publicId, body);
    if (!data) throw new Error('Failed to update network address');
    return data;
  }

  @Delete()
  @Roles('super_admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Query('ids') ids: string[]) {
    await this.networkAddressService.batchRemove({ ids });
  }
}
