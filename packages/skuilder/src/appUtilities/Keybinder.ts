import * as mt from 'mousetrap'

export default class Keybinder {
    bindings: Array<Binding>;

    bind(): void {
        this.bindings.forEach(
            (binding) => {
                mt.bind(binding.binding, binding.callback, binding.action);
            })
    }
    unbind(): void {
        this.bindings.forEach(
            (binding) => {
                mt.unbind(binding.binding, binding.action);
            })
    }

    constructor(bindings: Array<Binding>) {
        this.bindings = bindings;
    }
}

interface Binding {
    binding: string | Array<string>;
    callback: (e: ExtendedKeyboardEvent, combo: string) => any;
    action?: string;
}