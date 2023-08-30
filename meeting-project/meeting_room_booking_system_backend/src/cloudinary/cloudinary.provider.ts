import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dmidjvzo8',
      api_key: '724344734622333',
      api_secret: 'XVZF68cxJsn4IuPe_-yxET4m3ls',
    });
  },
};

// CLOUDINARY_CLOUD_NAME = 'dmidjvzo8';
// CLOUDINARY_API_KEY = '724344734622333';
// CLOUDINARY_API_SECRET = 'XVZF68cxJsn4IuPe_-yxET4m3ls';
