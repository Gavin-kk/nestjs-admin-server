import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, input) => {
  const req = input.args[0];
  const { user } = req;
  return user;
});
