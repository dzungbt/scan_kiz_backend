export const REQUEST_STATUS_CREATED = 0;
export const REQUEST_STATUS_ON_NEGOTIATION = 1;
export const REQUEST_STATUS_PAID = 2;
export const REQUEST_STATUS_ON_DELIVERY = 3;
export const REQUEST_STATUS_DONE = 4;

export const REQUEST_STATUS_ARR = [REQUEST_STATUS_CREATED,
    REQUEST_STATUS_ON_NEGOTIATION,
    REQUEST_STATUS_PAID,
    REQUEST_STATUS_DONE
];

export const SYSTEM_ROLE = {
    ADMIN: 'admin',
    USER: 'user'
};

export const SYSTEM_ROLE_ARR = [
    SYSTEM_ROLE.ADMIN,
    SYSTEM_ROLE.USER,
];

export const SYSTEM_STATUS = {
    ACTIVE: 'active',
    BLOCKED: 'blocked'
};

export const SYSTEM_STATUS_ARR = [
    SYSTEM_STATUS.ACTIVE,
    SYSTEM_STATUS.BLOCKED,
];


