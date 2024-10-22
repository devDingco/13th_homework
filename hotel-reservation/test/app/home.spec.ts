import {
  render,
  screen
} from '@testing-library/react';

import Home from '@/app/page';

test('Is Home rendering', async() => {
  render(Home());
  
  await screen.findByRole('main');

  expect(screen.getByLabelText('싱글데이 et started by editing'))
    .toContainElement(screen.getByRole('code'));
});
