/*
// Interface
interface IPoint {
    getDist(): number;
}

// Module
module Shapes {

    // Class
    export class Point implements IPoint {
        // Constructor
        constructor (public x: number, public y: number) { }

        // Instance member
        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }

        // Static member
        static origin = new Point(0, 0);
    }

}

// Local variables
var p: IPoint = new Shapes.Point(3, 4);
var dist = p.getDist();
*/

//
// Global data
//
interface PeopleData {
    uid: string;
    name: string;
    dept: string;
    checkbox: boolean;
}

var gInitialData: Array<PeopleData> = [{ uid: "bp", name: "brad", dept: "engineering", checkbox: true },
    { uid: "sl", name: "susan", dept: "law", checkbox: false },
    { uid: "fmp", name: "frank", dept: "science", checkbox: true },
    { uid: "sjp", name: "sadie", dept: "math", checkbox: false }];

var gStartTag: string = "<TABLE id='mainTable'><TBODY><TR><TD style=\"WIDTH: 120px\">User ID</TD><TD style=\"WIDTH: 120px\">User Name</TD><TD style=\"WIDTH: 120px\">Department</TD></TR>",
    gEndTag: string = "</TBODY></TABLE>";

// 
// Module
class TableManager {
    mCurrDocument: Document;
    mTRContents: NodeList;
    mNewTable: string;
    
    // Constructor
    constructor(inDocument: Document) {
        this.mCurrDocument = inDocument;
        this.mTRContents = inDocument.body.getElementsByTagName('TR');
        this.mNewTable = "";
    }

    initialize()
    {
        if (this.mTRContents.length > 1)
        {
            for (var i: number = 1; i < this.mTRContents.length; i++)
            {
                if ((<HTMLElement>this.mTRContents[i]).innerHTML)
                {
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

// 
// Function adds a name to the list after clicking 'Add'
//
function CmdAdd_onclick()
{
    var newTable:string = gStartTag;
    var trContents;

    //Get the row contents
    trContents = document.body.getElementsByTagName('TR');

    if (trContents.length > 1) {
        for (var i = 1; i < trContents.length; i++) {
            if (trContents(i).innerHTML) {
                // Add previous rows
                newTable += "<TR>";
                newTable += trContents(i).innerHTML;
                newTable += "</TR>";
            }
        }
    }

    //Add the Latest row
    newTable += "<TR><TD style=\"WIDTH: 120px\" >" +
    (<HTMLInputElement> document.getElementById('userid')).value + "</TD>";

    newTable += "<TD style=\"WIDTH: 120px\" >" +
    (<HTMLInputElement> document.getElementById('username')).value + "</TD>";

    newTable += "<TD style=\"WIDTH: 120px\" >" +
    (<HTMLInputElement> document.getElementById('department')).value + "</TD><TR>";

    newTable += gEndTag;

    //Update the Previous Table With New Table.
    document.getElementById('tableDiv').innerHTML = newTable;
}
// ]]>

//
// Used to configure checkbox with "checked" if data is checked
//
function isChecked(data, row):string {
    if (data[row].checkbox == true)
        return "checked";
    else
        return "";
}

function CmdInit_onclick() {
    var newTable = gStartTag;

    var trContents;

    trContents = document.body.getElementsByTagName('TR');

    //Get the row contents
    var currTable: TableManager = new TableManager(document);

    if (trContents.length > 1) {
        for (var i:number = 1; i < trContents.length; i++) {
            if (trContents(i).innerHTML) {
                // Add previous rows
                newTable += "<TR>";
                newTable += trContents(i).innerHTML;
                newTable += "</TR>";
            }
        }
    }

    for (var i: number = 0; i < gInitialData.length; i++) {

        //Add the Latest row
        newTable += "<TR id=" + i + "><TD style=\"WIDTH: 120px\" >" +
        gInitialData[i].uid + "</TD>";

        newTable += "<TD style=\"WIDTH: 120px\" >" +
        gInitialData[i].name + "</TD>";

        newTable += "<TD style=\"WIDTH: 120px\" >" +
        gInitialData[i].dept + "</TD>";

        newTable += "<TD style=\"WIDTH: 120px\" >" + "<input type=\"checkbox\" " + isChecked(gInitialData, i) + " onclick=\"return cmd_checkbox(this)\">" + "</TD><TR>";
    }

    newTable += gEndTag;

    //Update the Previous Table With New Table.
    document.getElementById('tableDiv').innerHTML = newTable;
}

function cmd_checkbox(chk_row) {
    // Move up to the row since we are in the check_box element
    var row = chk_row.parentNode.parentNode;

    console.log("found row: ", row.id);
    console.log("row uid: ", gInitialData[parseInt(row.id, 10)].uid);

}

 