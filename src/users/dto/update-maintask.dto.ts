import { PartialType } from "@nestjs/swagger";
import { CreateMainTaskDto } from "./create-maintask.dto";

export class UpdateMainTaskDto extends PartialType(CreateMainTaskDto){}