export interface CreateOrgCommand {
  name: string;
  email: string;
  phone: string;
  description: string;
}

export interface CreateOrgResponse {
  org: {
    id: string;
  };
}
