export class InvalidResourceSelectionError extends Error {
    constructor(resourceName: string, availableResources: string[]) {
        const availableResourcesString = availableResources.join(', ');
        super(`${resourceName} not found or does not exist. Available resources: ${availableResourcesString}`);
        this.name = "InvalidResourceSelectionError";
    }
}