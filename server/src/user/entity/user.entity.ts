import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ContactEnum, EducationBackgroundEnum } from "src/common/common.enum";
import { Column, Entity, PrimaryGeneratedColumn, DeepPartial } from "typeorm";
import { DateAudit } from "../../common/date.audit";

@Entity({ name: "user" })
export class UserEntity extends DateAudit {
  @ApiHideProperty()
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  mobileNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ nullable: false })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ nullable: false })
  lastName: string;

  @ApiProperty({ format: "date" })
  @Column({ nullable: false, type: "date" })
  dob: Date;

  @ApiProperty({ default: null })
  @Column({ nullable: true })
  gender: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  address: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  nationality: string;

  @ApiProperty({ enum: EducationBackgroundEnum })
  @Column({ nullable: true, type: "enum", enum: EducationBackgroundEnum })
  educationBackground: string;

  @ApiProperty({ enum: ContactEnum })
  @Column({ nullable: true, type: "enum", enum: ContactEnum })
  contact: string;

  constructor(partial: DeepPartial<UserEntity> = null) {
    super();
    Object.assign(this, partial);
  }
}
