///<reference path="node.d.ts" />

// Hand-crafted set of interfaces to mongoose module
//
// This is a minimal set required for compilation; add new definitions
// as required.

declare module "mongoose" {

    export interface StatusCallback {
        callback(error?: Error, data?: any): void;
    }

    export class Connection extends EventEmitter {
        readyState: number;

        model(name: string, schema?: Schema, collection?: string): Model;
        modelNames(): string[];
        open(connectionString: string, database?: string, port?: number, options?: any, callback?: StatusCallback): void;
        close(callback?: StatusCallback);
    }

    export class Document {
        validate(validator: StatusCallback): void;
    }

    export interface Model {
        new (doc: any): Document;

        modelName: string;

        count(conditions: any, callback?: StatusCallback): Query;
        create(doc: any, fn: StatusCallback): void;
        distinct(field: string, conditions?: any, callback?: StatusCallback): Query;
        find(conditions?: any, fields?: any, options?: any, callback?: StatusCallback): Query;
        findById(id: any, fields?: any, options?: any, callback?: StatusCallback): Query;
        findByIdAndRemove(id: any, options?: any, callback?: StatusCallback): Query;
        findByIdAndUpdate(id: any, update?: any, options?: any, callback?: StatusCallback): Query;
        findOne(conditions: any, fields?: any, options?: any, callback?: StatusCallback): Query;
    }

    export class Promise {
    }

    export class Query {
        exec(operation?: any, callback?: StatusCallback): Promise;
        lean(v?: boolean): Query;
        limit(val: number): Query;
        skip(val: number): Query;
        sort(val: any): Query;
    }

    export interface SchemaOptions {
        _id?: boolean;
        versionKey?: any; // boolean or string
    }

    export interface SchemaTypes {
        Mixed: any;
    }

    export class Schema {
        public static Types: SchemaTypes;
        constructor(definition: any, options?: SchemaOptions);
    }

    export function createConnection(connectionString: string, options: any): Connection;
}

/*
interface ICallback {
    (error: string, item: any): void;
}


interface IEmptyCallback {
    (): void;
}


interface IErrorCallback {
    (item: string): void;
}


interface IWhere {
    equals(value: String): IChainable;
    gt(value: String): IChainable;
    lt(value: String): IChainable;
    in(value: String[]): IChainable;
}


interface IChainable {
    exec(item: ICallback): IChainable;
    populate(...args: any[]): IChainable;
    select(query: string): IChainable;
    limit(num: Number): IChainable;
    sort(field: String): IChainable;
    where(selector: String): IWhere;
}


interface IUpdateOptions {
    safe?: Boolean;
    upsert?: Boolean;
    multi?: Boolean;
    strict?: Boolean;
}
interface IMongooseSearchable {
    collection: any;
    findOne(item: any, callback?: ICallback): IChainable;
    findOneAndUpdate(query: any, updateFields: Object, options?: IUpdateOptions, callback?: ICallback): void;
    find(id: Object, fields?: any, options?: any, callback?: ICallback): IChainable;
    find(propBag: Object, callback?: ICallback): IChainable;
    remove(item: any, callback: IErrorCallback): void;
    update(query: Object, updatedFields: Object, options: IUpdateOptions, callback?: (error: String, numResponses: Number, rawResponse: any) => void);
}


interface IMongooseBase {
    _id: String;
    _doc: any;
    save(item: IEmptyCallback): void;
    push(item: IMongooseBase): void;
    toObject(): Object;
    remove(callBack: ICallback): void;
    equals(other: any): boolean;
}
*/
