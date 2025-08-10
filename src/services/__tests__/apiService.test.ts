
import axios from 'axios';
import { fetchCollection } from '../api/apiService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('apiService', () => {
  describe('fetchCollection', () => {
    it('should fetch a collection of items', async () => {
      const mockData = {
        data: {
          data: [
            { id: 1, attributes: { name: 'Item 1' } },
            { id: 2, attributes: { name: 'Item 2' } },
          ],
          meta: {},
        },
      };
      mockedAxios.get.mockResolvedValue(mockData);

      const { data, meta } = await fetchCollection('items');

      expect(data).toEqual([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]);
      expect(meta).toEqual({});
      expect(mockedAxios.get).toHaveBeenCalledWith('/items', {
        params: { pagination: { pageSize: 10 } },
      });
    });
  });
});
// Removed: This test file was for Strapi apiService, which is now deprecated.
