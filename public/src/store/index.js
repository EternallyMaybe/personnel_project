import {observable, action, configure} from 'mobx';

configure({enforceActions: 'always'});
class Store {
    @observable.ref userInfo = {};

    @action 
    setUserInfo(val) {
        this.userInfo = val;
    }
}

export default new Store();