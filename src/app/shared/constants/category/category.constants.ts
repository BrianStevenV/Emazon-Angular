

export const TOAST_VISIBILITY_DURATION = 3000;

export const TITLE_CATEGORY = 'Category' as const;

export const FIELD_NAMES = {
    LABEL_CATEGORY_NAME : 'Category Name',
    LABEL_CATEGORY_DESCRIPTION : 'Category Description'
} as const;


export const SUCCESS_MESSAGES_POST = {
    CATEGORY_CREATED: 'Category created successfully',
    UNEXPECTED_RESPONSE: 'Unexpected response',
} as const;

export const ERROR_CODES = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  } as const;
  
  export const ERROR_MESSAGES_BY_CODE = {
    [ERROR_CODES.BAD_REQUEST]: 'An error occurred while creating the category.',
    [ERROR_CODES.CONFLICT]: 'Category name already exists.',
    [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
  } as const;

  export const GENERIC_ERROR_MESSAGE = 'Error creating category';