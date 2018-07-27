// https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87
console.log('test');

export class DataSource {
    ondata: any;
    onerror: any;
    oncomplete: any;
    destroy() {};
}

export class SafeObserver {
    unsub: any;
    unsubscribe() {}
    next(e) {};
    error(err) {
        this.unsubscribe();
    };
    complete() {
        this.unsubscribe();
    };

    constructor(private observer: any){
        this.observer.next = this.observer.next || this.next;
        this.observer.error = this.observer.error || this.error;
        this.observer.complete = this.observer.complete || this.next;
    }
}

const myObservable = (observer) => {
    const safeObserver = new SafeObserver(observer);
    const datasource = new DataSource();
    datasource.ondata = (e) => safeObserver.next(e);
    datasource.onerror = (err) => safeObserver.error(err);
    datasource.oncomplete = () => safeObserver.complete();
    safeObserver.unsub = () => {
        datasource.destroy();
    };

    return safeObserver.unsubscribe.bind(safeObserver);
}