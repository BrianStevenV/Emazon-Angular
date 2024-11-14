export const TOAST_VISIBILITY_DURATION = 3000;

export const TITLE_PRODUCT = 'Product' as const;

export const ERROR_CODES = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  } as const;
  
  export const ERROR_MESSAGES_BY_CODE = {
    [ERROR_CODES.BAD_REQUEST]: 'An error occurred while creating the Product.',
    [ERROR_CODES.CONFLICT]: 'Product name already exists.',
    [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
  } as const;

  export const GENERIC_ERROR_MESSAGE = 'Error creating Product';


export const SUCCESS_MESSAGES_POST = {
  PRODUCT_CREATED: 'Product created successfully',
  UNEXPECTED_RESPONSE: 'Unexpected response',
} as const;

export const MIN_LENGTH = 3;
export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_SORT_BY = 'ASC';
export const ELLIPSIS_THRESHOLD = 2;
export const LAST_PAGE_THRESHOLD = 3;

export const BUTTON_OPEN_MODAL_NAME = 'Add Product';
export const BUTTON_OPEN_MODAL_TYPE = 'button';
export const MODAL_VISIBLE = false;
export const MODAL_TITLE = 'Create Product';
export const MODAL_CLOSE_BUTTON_NAME = 'Close';
export const MODAL_SUBMIT_BUTTON_NAME = 'Save';

export const MODAL_FORM_FIELDS_NAME_PRODUCT_NAME = 'name';
export const MODAL_FORM_FIELDS_LABEL_PRODUCT_NAME = 'Product Name';
export const MODAL_FORM_FIELDS_NAME_PRODUCT_DESCRIPTION = 'description';
export const MODAL_FORM_FIELDS_LABEL_PRODUCT_DESCRIPTION = 'Product Description';
export const MODAL_FORM_FIELDS_NAME_PRODUCT_AMOUNT = 'amount';
export const MODAL_FORM_FIELDS_LABEL_PRODUCT_AMOUNT = 'Product Amount';
export const MODAL_FORM_FIELDS_NAME_PRODUCT_PRICE = 'price';
export const MODAL_FORM_FIELDS_LABEL_PRODUCT_PRICE = 'Product Price';
export const MODAL_FORM_FIELDS_NAME_PRODUCT_BRAND_ID = 'brandId';
export const MODAL_FORM_FIELDS_LABEL_PRODUCT_BRAND_ID = 'Product Brand';
export const MODAL_FORM_FIELDS_NAME_PRODUCT_CATEGORY_ID = 'categoryId';
export const MODAL_FORM_FIELDS_LABEL_PRODUCT_CATEGORY_ID = 'Product Category';

export const MODAL_FORM_FIELDS_TYPE_TEXT = 'text';
export const MODAL_FORM_FIELDS_TYPE_TEXTAREA = 'textarea';
export const MODAL_FORM_FIELDS_TYPE_NUMBER = 'number';
export const MODAL_FORM_FIELDS_TYPE_DATE = 'date';

export const MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_NAME = 150;
export const MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_DESCRIPTION = 2500;
export const MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_AMOUNT = 4;
export const MODAL_FORM_FIELDS_MAX_LENGTH_PRODUCT_PRICE = 10;

export const MAX_SELECTION_CATEGORIES = 3;
export const MAX_SELECTION_BRANDS = 1; 

export const FORM_CONTROL_NAME_DROPDOWN_CATEGORY = 'categoryId';
export const FORM_CONTROL_NAME_DROPDOWN_BRAND = 'brandId';

export const BUTTON_DROPDOWN_NAME_CATEGORY = 'Add Category';
export const BUTTON_DROPDOWN_NAME_BRAND = 'Add Brand';

export const BUTTON_DROPDOWN_TYPE = 'button';

export const TABLE_HEADERS_NAME = 'Name';
export const TABLE_HEADERS_DESCRIPTION = 'Description';
export const TABLE_HEADERS_AMOUNT = 'Amount';
export const TABLE_HEADERS_PRICE = 'Price';
export const TABLE_HEADERS_BRAND = 'Brand';
export const TABLE_HEADERS_CATEGORY = 'Categories';

export const SERVICES_GET_PRODUCT_SORT_DIRECTION = 'sortDirectionRequestDto';
export const SERVICES_GET_PRODUCT_PAGE_NUMBER = 'pageNumber';
export const SERVICES_GET_PRODUCT_PAGE_SIZE = 'pageSize';

export const ERROR_SHOW_TOAST_MESSAGE_EXCEPTION = 'An error occurred while loading the Products.';