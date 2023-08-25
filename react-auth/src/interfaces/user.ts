export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userCode: string;
  roles: Role[];
  createdAt: Date;
  modifiedAt: Date;
}

interface Role {
  roleId: number;
  name: string;
  permissions: Permission[];
  createdAt: Date;
  modifiedAt: Date;
}

interface Permission {
  permissionId: number;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
}