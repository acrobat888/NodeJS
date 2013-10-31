///<reference path='node.d.ts' />

// Hand-crafted set of interfaces to mongoose module
//
// This is a minimal set required for compilation; add new definitions
// as required.

declare module "mongoose" {

    export interface StatusCallback {
        (error?: Error, data?: any): void;
    };

    export class Connection extends EventEmitter {
        readyState: number;

        model(name: string, schema?: Schema, collection?: string): Model;
        modelNames(): string[];
        open(connectionString: string, database?: string, port?: number, options?: any, callback?: StatusCallback): void;
        close(callback?: StatusCallback);
    };

    export class Document {
        validate(validator: StatusCallback): void;
    };

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
    };

    export class Promise {
    };

    export class Query {
        exec(operation?: any, callback?: StatusCallback): Promise;
        lean(v?: bool): Query;
        limit(val: number): Query;
        skip(val: number): Query;
        sort(val: any): Query;
    };

    export interface SchemaOptions {
        _id?: bool;
        versionKey?: any; // bool or string
    };

    export interface SchemaTypes {
        Mixed: any;
    };

    export class Schema {
        public static Types: SchemaTypes;
        constructor(definition: any, options?: SchemaOptions);
    };

    export function createConnection(connectionString: string, options: any): Connection;
}

