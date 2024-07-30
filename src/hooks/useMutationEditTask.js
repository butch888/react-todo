import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationEditTask = () => {
    return useMutation(
      async (data) => {
        await axios.post(`http://localhost:3001/editTask/${data.id}/${data.task}`)
      }
    );
  }