import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationDoneTask = () => {
    return useMutation(
      async (data) => {
        await axios.post(`http://localhost:3001/taskUpdateIsdone/${data.id}/${data.isdone}`)
      }
    );
  }

  