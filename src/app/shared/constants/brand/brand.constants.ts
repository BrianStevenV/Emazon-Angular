
export const TOAST_VISIBILITY_DURATION = 3000;

export const TITLE_BRAND = 'Brand' as const;

export const FIELD_NAMES = {
    LABEL_BRAND_NAME : 'Brand Name',
    LABEL_BRAND_DESCRIPTION : 'Brand Description'
} as const;


export const SUCCESS_MESSAGES_POST = {
    BRAND_CREATED: 'Brand created successfully',
    UNEXPECTED_RESPONSE: 'Unexpected response',
} as const;

export const ERROR_CODES = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  } as const;
  
  export const ERROR_MESSAGES_BY_CODE = {
    [ERROR_CODES.BAD_REQUEST]: 'An error occurred while creating the brand.',
    [ERROR_CODES.CONFLICT]: 'Brand name already exists.',
    [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
  } as const;

  export const GENERIC_ERROR_MESSAGE = 'Error creating Brand';

export const MIN_LENGTH = 3;
export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_SORT_BY = 'ASC';
export const ELLIPSIS_THRESHOLD = 2;
export const LAST_PAGE_THRESHOLD = 3;

export const BUTTON_OPEN_MODAL_NAME = 'Add Brand';
export const BUTTON_OPEN_MODAL_TYPE = 'button';
export const MODAL_VISIBLE = false;
export const MODAL_TITLE = 'Create Brand';
export const MODAL_CLOSE_BUTTON_NAME = 'Close';
export const MODAL_SUBMIT_BUTTON_NAME = 'Save';

export const MODAL_FORM_FIELDS_NAME_BRAND_NAME = 'brandName';
export const MODAL_FORM_FIELDS_LABEL_BRAND_NAME = 'Brand Name';
export const MODAL_FORM_FIELDS_TYPE_TEXT = 'text';
export const MODAL_FORM_FIELDS_DESCRIPTION_BRAND_DESCRIPTION = 'brandDescription';
export const MODAL_FORM_FIELDS_LABEL_BRAND_DESCRIPTION = 'Brand Description';
export const MODAL_FORM_FIELDS_TYPE_TEXTAREA = 'textarea';

export const MODAL_FORM_FIELDS_MAX_LENGTH_BRAND_NAME = 50;
export const MODAL_FORM_FIELDS_MAX_LENGTH_BRAND_DESCRIPTION = 120;

export const TABLE_HEADERS_NAME = 'Name';
export const TABLE_HEADERS_DESCRIPTION = 'Description';

export const ERROR_SHOW_TOAST_MESSAGE_EXCEPTION = 'An error occurred while loading the brands.';
export const ON_MODAL_SUBMIT_LENGTH_VALIDATION = 0;

export const SERVICES_GET_BRAND_SORT_DIRECTION = 'sortDirectionRequestDto';
export const SERVICES_GET_BRAND_PAGE_NUMBER = 'pageNumber';
export const SERVICES_GET_BRAND_PAGE_SIZE = 'pageSize';