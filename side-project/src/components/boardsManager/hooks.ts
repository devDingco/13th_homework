import { useCreateBoardMutation } from '@/graphql/mutations/createBoard/createBoard.generated';
import {
  boardsManagerSchema,
  IBoardsManager,
} from '@/schemas/boardsManagerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useBoardsManager() {
  const [boardManager] = useCreateBoardMutation();

  const methods = useForm<IBoardsManager>({
    resolver: zodResolver(boardsManagerSchema),
    mode: 'onChange',
  });

  const onChangeContents = (textValue) => {
    methods.setValue('contents', textValue);
    methods.trigger('contents');
  };

  return { onChangeContents, methods };
}
