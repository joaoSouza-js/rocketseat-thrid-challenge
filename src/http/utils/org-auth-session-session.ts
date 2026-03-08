import TestAgent from "supertest/lib/agent"

interface OrgAuthSessionRequestResponse {
    token: string
    org: {
        id: string
    }

}

interface OrgProps {
    name?: string,
    email?: string,
    password?: string,
    phone?: string,
    description?: string,
}


export async function orgAuthSessionRequest(agent: TestAgent, org?: OrgProps): Promise<OrgAuthSessionRequestResponse> {
    const orgEmail = org?.email ?? "org@gmail.com"
    const orgPassword = org?.password ?? "org-password"
    const orgName = org?.name ?? "joe doe"
    const orgPhone = org?.phone ?? "123456789"
    const orgDescription = org?.description ?? "any_description"

    const newOrg = {
        name: orgName,
        email: orgEmail,
        password: orgPassword,
        phone: orgPhone,
        description: orgDescription,
    };

    await agent.post('/api/org').send(newOrg)
    const response = await agent.post("/api/org/session").send({
        email: orgEmail,
        password: orgPassword
    })

    return response.body
}