const mysql = require( 'mysql' );

class Database {
    
    config = {
        host: "localhost",
        user: "root",
        password: "",
        database: "softversko_v2",
        timezone: 'utc'
    }

    constructor() {
        this.connection = mysql.createConnection(this.config);
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                    
                //kad nema nista vraca prazan niz
                resolve( rows );
            } );
        } );
    }

    queryInQuery(query1, queryItem) {
        connection.query(query1, (err,rows) => {
            var response = [];
            //doing something with rows
            Promise.all(rows.map((item) => {
                var promise = new Promise(function(resolve,reject) {
                    connection.query(queryItem,function(err,rows) {
                        //doing something
                        result = rows[0].field;
                        //and want to push it to an array
                        resolve(result);
                    });
                });
                return promise.then(function(result) {
                    console.log(result); //ok
                    response.push(result) //ok
                });
            }).then(function () {
                console.log(response); //not empty
            })
            );
        })
    }

    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

module.exports = Database