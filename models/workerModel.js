const mysql=require("mysql")
require("dotenv").config()

const pool=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:'',
    database:process.env.DB_NAME
})


const workerModel={
    insertworker:(workerData,callback)=>{
        const query='INSERT INTO worker SET ?';
        pool.query(query,workerData,callback)
    },
    viewWorkers:(callback)=>{
        const query='SELECT * FROM worker';
        pool.query(query,callback)
    },
    workerLogin: (worker_emailid, callback) => { // Remove user_password parameter
        // Your user table needs to have an 'email' and 'password' column
        const query ='SELECT * FROM worker WHERE worker_emailid = ?  LIMIT 1';
        ; // Assuming your table is named 'admin'
        pool.query(query, [worker_emailid],(error, results) => {
          if (error) {
            return callback(error, null);
          }
          // If no user found, results array will be empty
          if (results.length === 0) {
            return callback(null, null);
          }
          // Return the first user found (there should only be one due to the 'LIMIT 1' in the query)
          return callback(null, results[0]);
      });
    }
    // workerLogin: (worker_emailid, callback) => {
    //      const query = 'SELECT * FROM worker WHERE worker_emailid = ? AND worker_status = 1 LIMIT 1';
    //     pool.query(query, [worker_emailid], (error, results) => {
    //         if (error) {
    //             return callback(error, null);
    //         }
    //         if (results.length === 0) {
    //             return callback(null, { worker: null });
    //         }
    //         const worker = results[0];
    //         // Worker is approved
    //         return callback(null, { worker, status: "Approved" });
    //     });
    // }
    
    
    
}    
module.exports=workerModel