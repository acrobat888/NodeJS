// 
// Module
//
module tables
{
    export class TableManager {
        mCurrDocument: Document;
        mTRContents: NodeList;
        mNewTable: string;

        // Constructor
        constructor(inDocument: Document) {
            this.mCurrDocument = inDocument;
            this.mTRContents = inDocument.body.getElementsByTagName('TR');
            this.mNewTable = "";
        }

        initialize() {
            if (this.mTRContents.length > 1) {
                for (var i: number = 1; i < this.mTRContents.length; i++) {
                    if ((<HTMLElement>this.mTRContents[i]).innerHTML) {
                        // Add previous rows
                        this.mNewTable += "<TR>";
                        this.mNewTable += (<HTMLElement>this.mTRContents[i]).innerHTML;
                        this.mNewTable += "</TR>";
                    }
                }
            }
        }

        udpate(inNewTable: string) {
            document.getElementById('tableDiv').innerHTML = inNewTable;
        }
    }
}
