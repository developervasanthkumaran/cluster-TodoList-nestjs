import { PartialType } from "@nestjs/swagger";
import { CreateSubTaskDto } from "./create-subtask.dto";

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto){}