import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const userRole = String(req.user.role).toLowerCase();
    const match = requiredRoles.map((r) => r.toLowerCase()).includes(userRole);

    if (!match) {
      throw new UnauthorizedException('You do not have access');
    }

    return true;
  }
}
