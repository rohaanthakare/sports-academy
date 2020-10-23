export class Role {
    code: string;
    name: string;
    description: string;
    permissions: any[];
}

export class RoleFeatureMapping {
    roleCode: string;
    featureCode: string;
}