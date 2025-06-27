import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  LocationType,
  MissionStatus,
  UrgencyLevel,
} from '../../users/entities/mission.entity';

export class CreateMissionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  budget: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsEnum(UrgencyLevel)
  urgency?: UrgencyLevel;

  @IsOptional()
  @IsEnum(LocationType)
  location?: LocationType;

  @IsOptional()
  @IsEnum(MissionStatus)
  status?: MissionStatus;
}
