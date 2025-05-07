import { CreateCapsuleDto } from "./create-capsule.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateFileDto extends PartialType(CreateCapsuleDto) {}
