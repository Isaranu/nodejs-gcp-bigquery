const {BigQuery} = require('@google-cloud/bigquery');
var dataset;
var table;

async function createDataset(){
   const bigqueryClient = new BigQuery();
   [dataset] = await bigqueryClient.createDataset('test');
   console.log(`Dataset ${dataset.id} created.`);
   createTable();
}

function createTable(){
    table = dataset.table('mytable');
    table.create({
        schema:'NAME:string, SURNAME:string, AGE:integer, TIME:float, BOOL:boolean'
    }).then((data) => {
        //const table = data[0];
        //const apiResponse = data[1];
        console.log('Table was created !');

        //insertJson();
        table.insert({
            NAME: 'test',
            SURNAME: 'test',
            AGE: 40,
            TIME: 50000000.012,
            BOOL: true
        }, insertHandler);

        // Set meta data to TABLE    
        /*
        const metadata = {
            name: 'My test',
            description: 'A table for storing my test',
            schema: 'NAME:string, SURNAME:string'
        };
          
        table.setMetadata(metadata).then((data) => {
            const metadata = data[0];
            const apiResponse = data[1];
            console.log('Set schema completed !');

        });
        */
        
    });
}

function insertJson(){
    
}

function insertHandler(err, apiResponse) {
    console.log('Data json was inserted !');
    console.log(err);
    console.log(apiResponse);
    
    if(err){
      if (err.name === 'PartialFailureError') {
        // Some rows failed to insert, while others may have succeeded.
        // err.errors (object[]):
        // err.errors[].row (original row object passed to `insert`)
        // err.errors[].errors[].reason
        // err.errors[].errors[].message
      }
    }else{
        //..
    }
  }

 createDataset();
