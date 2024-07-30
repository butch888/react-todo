import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationAddTask = () => {
    return useMutation(
      async (data) => {
        await axios.post(`http://localhost:3001/addTask/${data.id}/${data.task}/${data.isdone}`)
      }
    );
  }