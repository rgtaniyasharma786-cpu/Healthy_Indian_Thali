import { CanActivateFn } from '@angular/router';

export const customerGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('isLogin')== 'true'){
    return true;
  }
  else{
    return false;
  }
};
