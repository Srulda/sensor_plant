import { observable, action } from  'mobx'

export class GeneralStore {
    @observable name
    @action handleInput = (name, value) => {
        this[name] = value
    } 
}