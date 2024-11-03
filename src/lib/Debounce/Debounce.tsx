export default class Debounce<T extends Function> {
  protected timerID: number | undefined = undefined;

  constructor(protected fn: T, protected timeout = 1e3) {
    this.fn = fn
    this.timeout = timeout
  }

  public clear = () => window.clearTimeout(this.timerID)
  
  public init = (...args: T extends (...args: infer P) => any ? P : never) => {
    this.clear()
    this.timerID = window.setTimeout(this.fn, this.timeout, ...args);
  }
}

// class DebounceSubmit extends Debounce<(target: HTMLInputElement) => void> {
//   constructor(protected timeout = 1e3) {
//     const submit = (target: HTMLInputElement) => target.closest('form')!.requestSubmit()
//     super(submit, timeout)
//   }
// }