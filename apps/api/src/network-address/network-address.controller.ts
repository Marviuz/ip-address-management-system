import {
  Body,
  Controller,
  Get,
  Post,
  // Patch,
  // Param,
  // Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateNetworkAddressPayload } from '@ip-address-management-system/shared';
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
  findAll() {
    return this.networkAddressService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.networkAddressService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNetworkAddressDto: UpdateNetworkAddressDto) {
  //   return this.networkAddressService.update(+id, updateNetworkAddressDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.networkAddressService.remove(+id);
  // }
}
