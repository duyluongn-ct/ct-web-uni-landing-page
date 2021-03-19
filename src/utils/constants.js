const prefix = 'regions';

export const SELECT_REGION = `${prefix}/SELECT_REGION`;
export const SELECT_SUB_REGION = `${prefix}/SELECT_SUB_REGION`;
export const GET_SUB_REGION_LIST = `${prefix}/GET_SUB_REGION_LIST`;

export const ALL_REGION = { id: 0, name_url: 'toan-quoc', name: 'Toàn Quốc' };
export const ALL_SUB_REGION = { id: 0, name_url: 'tat-ca', name: 'Tất cả' };

export const APPLE_METAS_LINKS = {
  metas: [
    {
      name: 'theme-color',
      content: '#FFBA00',
    },
    {
      name: 'full-screen',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Chợ Tốt',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: '#FFBA00',
    },
  ],
  links: [],
};

export const HOUR = 3600;
export const SIX_HOURS = HOUR * 6;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;

const VIEW_MODE = {
  LIST: '0',
  GRID: '1',
};

const DAYS_PER_MONTH = 146097 / 400 / 12;

const VIEW_MODE_PARAM_NAME = 'vm';
const SPLIT_MARK = '&';
const EQUAL_MARK = '=';
const FALSY_VALUE_DENY = ['undefined', 'null'];

const SORT = {
  byTime: {
    value: '0',
    label: 'Tin mới trước',
  },
  byPrice: {
    value: '1',
    label: 'Giá thấp trước',
  },
  byLowestSalary: {
    value: '2',
    label: 'Lương thấp trước',
  },
  byHighestSalary: {
    value: '3',
    label: 'Lương cao trước',
  },
};

const SORY_BY_TYPE = [
  {
    type: 'c,p',
    name: 'Tất cả',
    paramName: 'total',
  },
  {
    type: 'p',
    name: 'Cá nhân',
    paramName: 'privateAds',
  },
  {
    type: 'c',
    name: 'Bán chuyên',
    paramName: 'companyAds',
  },
];

const SORT_BY_CATEGORY = {
  default: [SORT.byTime, SORT.byPrice],
  job: [SORT.byTime, SORT.byLowestSalary, SORT.byHighestSalary],
};

const WORD_BY_CATEGORY = {
  0: {
    adView: {
      CHAT_BUTTON: 'CHAT VỚI NGƯỜI BÁN',
      LOCATION_LABEL: 'Khu vực',
      REVIEWER_BY: 'Tin rao này đã được kiểm duyệt',
    },
    adListing: {
      AD_TYPE_LABEL: 'Bán chuyên',
    },
  },
  13000: {
    adListing: {
      AD_TYPE_LABEL: 'Công ty',
    },
  },
  13010: {
    adView: {
      CHAT_BUTTON: 'CHAT VỚI NHÀ TUYỂN DỤNG',
      LOCATION_LABEL: 'Nơi làm việc',
      REVIEWER_BY: 'Tin đăng này đã được kiểm duyệt',
    },
    adListing: {
      AD_TYPE_LABEL: 'Công ty',
    },
  },
  13020: {
    adView: {
      CHAT_BUTTON: 'CHAT VỚI NGƯỜI TÌM VIỆC',
      LOCATION_LABEL: 'Nơi làm việc mong muốn',
      REVIEWER_BY: 'Tin đăng này đã được kiểm duyệt',
    },
    adListing: {
      AD_TYPE_LABEL: 'Công ty',
    },
  },
};

const SUFFIX_NUMBERS = {
  4: 'nghìn',
  5: 'nghìn',
  6: 'nghìn',
  7: 'triệu',
  8: 'triệu',
  9: 'triệu',
  10: 'tỷ',
  11: 'tỷ',
  12: 'tỷ',
  13: 'tỷ',
};

const DIVISION_NUMBERS = {
  4: 1000,
  5: 1000,
  6: 1000,
  7: 1000000,
  8: 1000000,
  9: 1000000,
  10: 1000000000,
  11: 1000000000,
  12: 1000000000,
  13: 1000000000,
};

const DEFAULT_OBJECT_CATEGORY = {
  label: 'Tất cả danh mục',
  value: 0,
  route: 'mua-ban',
  id: 0,
  paramType: 'a',
};

const LIST_CATE_SHOW_DESCRIPTION = [9000];

const KEYWORD_ADSENSE = {
  'mua-ban-xe': 'Mua xe da qua su dung',
  'mua-ban-xe-may': 'Xe may tra gop',
  'mua-ban-o-to': 'Xe ô tô giá tốt',
  'mua-ban-xe-dap': 'Xe dap di lam',
  'mua-ban-xe-tai-xe-khac': 'xe tai qua su dung',
  'mua-ban-xe-khac': 'xe tai qua su dung',
  'mua-ban-phu-tung-xe': 'phu tung xe may',
  'mua-ban-xe-dien': 'xe đạp điện giá tốt',
  'mua-ban-bat-dong-san': 'Bat dong san gia re',
  'mua-ban-can-ho-chung-cu': 'Chung cu vinhomes',
  'mua-ban-nha-dat': 'Nha dat trung tam',
  'mua-ban-dat': 'bat dong san gia re',
  'sang-nhuong-van-phong-mat-bang-kinh-doanh': 'thue van phong gia re',
  'thue-bat-dong-san': 'bat dong san cho thue',
  'thue-can-ho-chung-cu': 'Can ho gia re',
  'thue-nha-dat': 'Nha dat trung tam gia re',
  'thue-dat': 'Đất',
  'thue-van-phong-mat-bang-kinh-doanh': 'van phong kinh doanh cho thue',
  'thue-phong-tro': 'Nha tro gia re',
  'mua-ban-do-dien-tu': 'Do dien tu',
  'mua-ban-dien-thoai': 'dien thoai tra gop',
  'mua-ban-may-tinh-bang': 'máy tính bảng giá rẻ',
  'mua-ban-laptop': 'laptop giá rẻ',
  'mua-ban-may-tinh-de-ban': 'may tinh de ban',
  'mua-ban-may-anh-may-quay': 'camera',
  'mua-ban-man-hinh-phu-kien': 'loa tra gop',
  'mua-ban-man-hinh-may-tinh-phu-kien-linh-kien': 'linh kien may tinh',
  'mua-ban-thoi-trang-do-dung-ca-nhan': 'thoi trang nu',
  'mua-ban-quan-ao': 'mua ao thun',
  'mua-ban-dong-ho': 'dong ho',
  'mua-ban-giay-dep': 'giay adidas chinh hang',
  'mua-ban-tui-xach': 'tui xach gia re',
  'mua-ban-nuoc-hoa': 'nuoc hoa chinh hang',
  'mua-ban-phu-kien-thoi-trang-khac': 'trang suc nu gia re',
  'mua-ban-do-dung-me-va-be': 'xe đẩy cho bé giá rẻ',
  'mua-ban-loai-khac': 'mật ong nguyên chất',
  'mua-ban-cac-loai-khac': 'mật ong rừng',
  'mua-ban-thu-cung': 'Thu cung',
  'mua-ban-ga': 'ban ga',
  'mua-ban-cho': 'chó poodle giá tốt',
  'mua-ban-chim': 'ban chim canh',
  'mua-ban-thu-cung-khac-phu-kien': 'thu cung',
  'mua-ban-noi-ngoai-that-do-gia-dung': 'nội ngoại thất',
  'mua-ban-tu-lanh-may-lanh-may-giat': 'Tu lanh gia re',
  'mua-ban-noi-ngoai-that-cay-canh': 'Cay canh',
  'mua-ban-do-gia-dung-gia-dinh-khac': 'do dung gia dinh',
  'mua-ban-giai-tri-the-thao-so-thich': 'dung cu the thao',
  'mua-ban-vat-nuoi-thu-cung': 'thu cung',
  'mua-ban-phim-sach-am-nhac': 'mua sach',
  'mua-ban-do-the-thao-da-ngoai': 'dung cu the thao',
  'mua-ban-do-suu-tam-game-so-thich': 'sách rẻ',
  'mua-ban-thiet-bi-van-phong-cong-nong-nghiep': 'văn phòng phẩm',
  'mua-ban-do-dung-van-phong': 'văn phòng phẩm',
  'mua-ban-do-chuyen-dung-giong-nuoi-trong': 'Giong cay trong',
  'viec-lam-dich-vu': 'Viec lam thoi vu',
  'viec-lam': 'viec lam thoi vu',
  'viec-tim-nguoi': 'viec lam thoi vu',
  'nguoi-tim-viec': 'viec lam thoi vu',
  'dich-vu-du-lich': 'dich vu cho thue xe',
  'dich-vu': 'dich vu cho thue xe',
  'du-lich': 'du lich gia re',
};

export {
  VIEW_MODE,
  VIEW_MODE_PARAM_NAME,
  SPLIT_MARK,
  EQUAL_MARK,
  FALSY_VALUE_DENY,
  SORT_BY_CATEGORY,
  SORY_BY_TYPE,
  WORD_BY_CATEGORY,
  SUFFIX_NUMBERS,
  DIVISION_NUMBERS,
  DEFAULT_OBJECT_CATEGORY,
  LIST_CATE_SHOW_DESCRIPTION,
  KEYWORD_ADSENSE,
  DAYS_PER_MONTH,
};
