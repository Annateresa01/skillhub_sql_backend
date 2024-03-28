const mysql=require("mysql")
require("dotenv").config()

const pool=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:'',
    database:process.env.DB_NAME
})

const adminModel={
    adminLogin: (admin_username, callback) => { // Remove user_password parameter
        // Your user table needs to have an 'email' and 'password' column
        const query ='SELECT * FROM admin WHERE admin_username = ?  LIMIT 1';
        ; // Assuming your table is named 'admin'
        pool.query(query, [admin_username],(error, results) => {
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
    },

    updateStatus: (worker_id, callback) => {
        const query = 'UPDATE worker AS w SET w.worker_status = 1 WHERE w.worker_id = ?';
    
        pool.query(query, [worker_id], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    }
}
module.exports=adminModel