import { useMutation } from '@apollo/client';

export function useMutationHandler(mutationFunction) {
  const [executeMutation] = useMutation(mutationFunction);

  const handleMutation = async (variables) => {
    try {
      const result = await executeMutation({ variables });
      console.log('요청 성공:', result);
      return result;
    } catch (error) {
      console.error('요청 실패:', error);
      throw error;
    }
  };

  return handleMutation;
}
