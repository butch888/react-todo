import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationDelTask = () => {
    return useMutation(
      async (data) => {
        await axios.post(`http://localhost:3001/delTask/${data.id}`)
      }
    );
  }