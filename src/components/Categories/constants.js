import { config } from '~app/config';

export const SPECIAL_CATEGORY_URL = {
  PROPERTY: 'mua-ban-bat-dong-san',
  VEHICLE: 'mua-ban-xe',
};
export const DEFAULT_LOCATION = 'toan-quoc';
export const HASH_TAG_SELECT_REGION = '#regionselect';

export const CATEGORIES = [
  {
    text: 'Bất động sản',
    slug: 'nha',
    categoryId: 1000,
    link: `${config.propertyURL}/${DEFAULT_LOCATION}/mua-ban-bat-dong-san`,
    image: 'https://static.chotot.com/storage/default/cat/small/cho-tot-nha.png',
    categoryUrl: SPECIAL_CATEGORY_URL.PROPERTY,
  },
  {
    text: 'Việc làm',
    slug: 'viec_lam',
    categoryId: 13000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/viec-lam`,
    image: 'https://static.chotot.com/storage/default/cat/small/viec-lam.png',
  },
  {
    text: 'Xe cộ',
    slug: 'xe',
    categoryId: 2000,
    link: `${config.vehicleURL}/${DEFAULT_LOCATION}/mua-ban-xe`,
    image: 'https://static.chotot.com/storage/default/cat/small/cho-tot-xe.png',
    categoryUrl: SPECIAL_CATEGORY_URL.VEHICLE,
  },
  {
    text: 'Tủ lạnh, máy lạnh, máy giặt',
    slug: 'tu_lanh_may_lanh_may_giat',
    categoryId: 9000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-tu-lanh-may-lanh-may-giat`,
    image: 'https://static.chotot.com/storage/default/cat/small/tu-lanh-may-giat.png',
  },
  {
    text: 'Đồ điện tử',
    slug: 'do_dien_tu',
    categoryId: 5000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-do-dien-tu`,
    image: 'https://static.chotot.com/storage/default/cat/small/do-dien-tu.png',
  },
  {
    text: 'Đồ gia dụng, Nội thất, cây cảnh',
    slug: 'do_gia_dung_noi_that_cay_canh',
    categoryId: 14000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-noi-ngoai-that-do-gia-dung`,
    image: 'https://static.chotot.com/storage/default/cat/small/noi-ngoai-that.png',
  },
  {
    text: 'Đồ ăn, thực phẩm và các loại khác',
    slug: 'loai_khac',
    categoryId: 7000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-do-an-thuc-pham-va-cac-loai-khac`,
    image: 'https://static.chotot.com/storage/default/cat/small/cac-loai-khac-v2.png',
  },
  {
    text: 'Thú cưng',
    slug: 'thu_cung',
    categoryId: 12000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-thu-cung`,
    image: 'https://static.chotot.com/storage/default/cat/small/thu-cung.png',
  },
  {
    text: 'Thời trang, đồ dùng cá nhân',
    slug: 'thoi_trang_do_dung_ca_nhan',
    categoryId: 3000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-thoi-trang-do-dung-ca-nhan`,
    image: 'https://static.chotot.com/storage/default/cat/small/thoi-trang-do-dung-ca-nhan.png',
  },
  {
    text: 'Giải trí, Thể thao, Sở thích',
    slug: 'giai_tri_the_thao_so_thich',
    categoryId: 4000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-giai-tri-the-thao-so-thich`,
    image: 'https://static.chotot.com/storage/default/cat/small/giai-tri-the-thao-so-thich.png',
  },
  {
    text: 'Mẹ và bé',
    slug: 'me_va_be',
    categoryId: 11000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-do-dung-me-va-be`,
    image: 'https://static.chotot.com/storage/default/cat/small/me-va-be.png',
  },
  {
    text: 'Đồ văn phòng, Công nông nghiệp',
    slug: 'thiet_bi_van_phong_cong_nong_nghiep',
    categoryId: 8000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban-thiet-bi-van-phong-cong-nong-nghiep`,
    image: 'https://static.chotot.com/storage/default/cat/small/do-van-phong.png',
  },
  {
    text: 'Dịch vụ, Du lịch',
    slug: 'dich_vu_du_lich',
    categoryId: 6000,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/dich-vu-du-lich`,
    image: 'https://static.chotot.com/storage/default/cat/small/dich-vu-du-lich.png',
  },
  {
    text: 'Tất cả danh mục',
    slug: 'tat_ca_danh_muc',
    categoryId: 0,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban`,
    image: 'https://static.chotot.com/storage/default/cat/small/tat-ca-danh-muc.png',
  },
  {
    text: 'Cho tặng miễn phí',
    slug: 'giveaway',
    queryStringChar: '&',
    categoryId: 9999,
    link: `${config.baseURL}/${DEFAULT_LOCATION}/mua-ban?giveaway=true`,
    image: 'https://static.chotot.com/storage/default/cat/small/cho-tang-mien-phi.png',
  },
];
