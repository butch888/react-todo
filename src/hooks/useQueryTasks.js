import axios from 'axios';
import { useQuery } from 'react-query';

export const useQueryTasks = () => {
    return useQuery(
      'tasks',
      async () => {
        const response = await axios.get('http://localhost:3001');
        return response.data
    });
  }