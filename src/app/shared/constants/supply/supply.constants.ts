export const SUPPLY_TOAST_VISIBILITY_DURATION = 3000;

export const SUPPLY_ERROR_CODES = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  } as const;
  
  export const SUPPLY_ERROR_MESSAGES_BY_CODE = {
    [SUPPLY_ERROR_CODES.BAD_REQUEST]: 'An error occurred while creating the Supply.',
    [SUPPLY_ERROR_CODES.CONFLICT]: 'Error creating Supply.',
    [SUPPLY_ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
  } as const;

  export const SUPPLY_GENERIC_ERROR_MESSAGE = 'Error creating Supply.';


export const SUPPLY_SUCCESS_MESSAGES_POST = {
  SUPPLY_CREATED: 'Supply created successfully',
  UNEXPECTED_RESPONSE: 'Unexpected response',
} as const;

export const MODAL_FORM_FIELDS_NAME_SUPPLY_PRICE = 'price';
export const MODAL_FORM_FIELDS_LABEL_SUPPLY_PRICE = 'Supply Price';
export const MODAL_FORM_FIELDS_NAME_SUPPLY_AMOUNT_TOTAL = 'quantityTotal';
export const MODAL_FORM_FIELDS_LABEL_SUPPLY_AMOUNT_TOTAL = 'Supply Amount Total';
export const MODAL_FORM_FIELDS_NAME_SUPPLY_AMOUNT_AVAILABLE = 'quantityAvailable';
export const MODAL_FORM_FIELDS_LABEL_SUPPLY_AMOUNT_AVAILABLE = 'Supply Amount Available';
export const MODAL_FORM_FIELDS_NAME_SUPPLY_IS_AVAILABLE = 'isAvailable';
export const MODAL_FORM_FIELDS_LABEL_SUPPLY_IS_AVAILABLE = 'Enable/Unable';
export const MODAL_FORM_FIELDS_NAME_SUPPLY_REPLENISMENT_DATE = 'replenishmentDate';
export const MODAL_FORM_FIELDS_LABEL_SUPPLY_REPLENISMENT_DATE = 'Replenishment Date';
export const MODAL_FORM_FIELDS_NAME_SUPPLY_PRODUCT_ID = 'productId';
export const MODAL_FORM_FIELDS_LABEL_SUPPLY_PRODUCT_ID = 'Product Id';

export const BUTTON_OPEN_MODAL_NAME_SUPPLY = 'Add Supply';
export const BUTTON_OPEN_MODAL_TYPE_SUPPLY = 'button';

export const MODAL_TITLE_SUPPLY = 'Create Supply';

export const MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_PRICE = 10;
export const MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_AMOUNT_TOTAL = 4;
export const MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_AMOUNT_AVAILABLE = 4;
export const MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_REPLENISMENT_DATE = 10;
export const MODAL_FORM_FIELDS_MAX_LENGTH_SUPPLY_PRODUCT_ID = Number.MAX_SAFE_INTEGER;

export const ON_MODAL_SUBMIT_LENGTH_VALIDATION = 0;