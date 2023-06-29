import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  create = async (body: UserEntity) => {
    return await this.userRepository.save(UserEntity.create({ ...body }));
  };

  findAll = async (params: any) => {
    return await this.userRepository
      .createQueryBuilder("user")
      .limit(params.take)
      .offset(params.skip)
      .orderBy("user.id", params.order)
      .getMany();
  };

  findOne = async (userId: string) => {
    return await this.userRepository
      .createQueryBuilder("user")
      .where("user.id =:id", { id: userId })
      .getOne();
  };
}
