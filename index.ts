// https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87
console.log('test');

export class DataSource {
    ondata: any;
    onerror: any;
    oncomplete: any;
    destroy: any;
}

const myObservable = (observer) => {
    const datasource = new DataSource();
    datasource.ondata = (e) => observer.next(e);
    datasource.onerror = (err) => observer.error(err);
    datasource.oncomplete = () => observer.complete();
    return () => {
        datasource.destroy();
    };
}