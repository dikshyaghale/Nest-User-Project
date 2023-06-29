import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { createdMessage, successMessage } from "../common/messages";
import { UsersFilterDto } from "./dto/user.filter.dto";
import { FilterDecorator } from "src/common/filter.decorator";

@ApiTags("Users")
@Controller("api/v1/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create user" })
  async create(
    @Body()
    body: UserEntity
  ) {
    return {
      statusCode: HttpStatus.CREATED,
      message: createdMessage("User"),
      data: await this.userService.create(body),
    };
  }

  @Get()
  @ApiOperation({ summary: "Get all user." })
  async findAll(@FilterDecorator() @Query() params: UsersFilterDto) {
    return {
      statusCode: HttpStatus.OK,
      message: successMessage,
      data: await this.userService.findAll(params),
    };
  }

  @Get("detail/:id")
  @ApiOperation({ summary: "Get detail of user by id" })
  async findUserById(@Param("id") id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: successMessage,
      data: await this.userService.findOne(id),
    };
  }
}
