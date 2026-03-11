import { OrgResponseDto } from "@/application/mappers/org-response-mapper";

export interface AuthenticateOrgCommand {
  email: string;
  password: string;
}

export interface AuthenticateOrgResponse {
  org: OrgResponseDto;
}
