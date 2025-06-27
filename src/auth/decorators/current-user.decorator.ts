import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUserType {
  userId: number;
  email: string;
  role: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserType => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
