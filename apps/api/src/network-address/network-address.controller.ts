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
  Ip,
} from '@nestjs/common';
import { Request } from 'express';
import {
  CreateNetworkAddressPayload,
  ensureRoleBasedNetAddrPayload,
  getNetworkAddressSchema,
  GetNetworkAddressSchema,
  getNetworkAddressType,
  UpdateNetworkAddressPayload,
} from '@ip-address-management-system/shared';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserAgent } from 'src/audit-logs/decorators/user-agent.decorator';
import { NetworkAddressService } from './network-address.service';

@Controller('network-address')
export class NetworkAddressController {
  constructor(private readonly networkAddressService: NetworkAddressService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: CreateNetworkAddressPayload,
    @Ip() ip: string | null,
    @UserAgent() userAgent: string | null,
  ) {
    const data = await this.networkAddressService.create(
      {
        addedBy: req.user.id,
        label: body.label,
        networkAddress: body.networkAddress,
        type: getNetworkAddressType(body.networkAddress).value,
        comments: body.comments,
      },
      ip,
      userAgent,
    );
    if (!data) throw new Error('Failed to create network address');
    return data;
  }

  @Get()
  findAll(@Query() payload: GetNetworkAddressSchema) {
    return this.networkAddressService.findAll(
      getNetworkAddressSchema.parse(payload),
    );
  }

  @Get(':publicId')
  async findOne(@Param('publicId') publicId: string) {
    const data = await this.networkAddressService.findOne(publicId);
    if (!data) throw new NotFoundException('Network address not found');
    return data;
  }

  @Put(':publicId')
  async update(
    @Req() req: Request,
    @Param('publicId') publicId: string,
    @Body() body: UpdateNetworkAddressPayload,
    @Ip() ip: string | null,
    @UserAgent() userAgent: string | null,
  ) {
    const filteredBody = ensureRoleBasedNetAddrPayload(req.user.role, body);
    const data = await this.networkAddressService.update(
      publicId,
      filteredBody,
      ip,
      userAgent,
    );
    return data;
  }

  @Delete()
  @Roles('super_admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Query('ids') ids: string[],
    @Ip() ip: string | null,
    @UserAgent() userAgent: string | null,
  ) {
    await this.networkAddressService.batchRemove({ ids }, ip, userAgent);
  }
}
